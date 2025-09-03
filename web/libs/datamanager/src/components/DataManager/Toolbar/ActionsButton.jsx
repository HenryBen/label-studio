import { IconChevronDown, IconChevronRight, IconTrash } from "@humansignal/icons";
import { Button, Spinner, Tooltip } from "@humansignal/ui";
import { inject, observer } from "mobx-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Block, Elem } from "../../../utils/bem";
import { FF_LOPS_E_3, isFF } from "../../../utils/feature-flags";
import { Dropdown } from "../../Common/Dropdown/DropdownComponent";
import Form from "../../Common/Form/Form";
import { Menu } from "../../Common/Menu/Menu";
import { Modal } from "../../Common/Modal/ModalPopup";
import "./ActionsButton.scss";

const isFFLOPSE3 = isFF(FF_LOPS_E_3);
const injector = inject(({ store }) => ({
  store,
  hasSelected: store.currentView?.selected?.hasSelected ?? false,
}));

const DialogContent = ({ text, form, formRef, store, action }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(form);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!formData) {
      setIsLoading(true);
      store
        .fetchActionForm(action.id)
        .then((form) => {
          setFormData(form);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [formData, store, action.id]);

  const fields = formData?.toJSON ? formData.toJSON() : formData;

  // Translate form field labels
  const translateFieldLabels = (fields) => {
    if (!fields || !Array.isArray(fields)) return fields;
    
    return fields.map(field => {
      if (field.label === 'Choose predictions') {
        return { ...field, label: t('dataManager.dialogs.createAnnotationsFromPredictions.choosePredictions') };
      }
      if (field.label === 'Annotator') {
        return { ...field, label: t('dataManager.dialogs.deleteAnnotations.annotatorLabel'), placeholder: t('dataManager.dialogs.deleteAnnotations.allPlaceholder') };
      }
      return field;
    });
  };

  const translatedFields = translateFieldLabels(fields);

  // Use translated text for specific actions
  const getDialogText = (action) => {
    if (action.id === 'retrieve_tasks_predictions') {
      return t('dataManager.dialogs.retrievePredictions.text');
    }
    if (action.id === 'create_annotations_from_predictions') {
      return t('dataManager.dialogs.createAnnotationsFromPredictions.text');
    }
    if (action.id === 'remove_duplicates') {
      return t('dataManager.dialogs.removeDuplicatedTasks.text');
    }
    if (action.id === 'delete_tasks_annotations') {
      return t('dataManager.dialogs.deleteAnnotations.text');
    }
    return text;
  };

  return (
    <Block name="dialog-content">
      <Elem name="text">{getDialogText(action)}</Elem>
      {isLoading && (
        <Elem name="loading" style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <Spinner />
        </Elem>
      )}
      {formData && (
        <Elem name="form" style={{ paddingTop: 16 }}>
          <Form.Builder ref={formRef} fields={translatedFields} autosubmit={false} withActions={false} />
        </Elem>
      )}
    </Block>
  );
};

const ActionButton = ({ action, parentRef, store, formRef }) => {
  const { t } = useTranslation();
  const isDeleteAction = action.id.includes("delete");
  const hasChildren = !!action.children?.length;
  const submenuRef = useRef();

  // Map backend action titles to translation keys
  const getActionTitle = (actionTitle) => {
    const titleMap = {
      'Retrieve Predictions': t('dataManager.toolbar.retrievePredictions'),
      'Create Annotations From Predictions': t('dataManager.toolbar.createAnnotationsFromPredictions'),
      'Remove Duplicated Tasks': t('dataManager.toolbar.removeDuplicatedTasks'),
      'Delete Tasks': t('dataManager.toolbar.deleteTasks'),
      'Delete Annotations': t('dataManager.toolbar.deleteAnnotations'),
      'Delete Predictions': t('dataManager.toolbar.deletePredictions'),
    };
    return titleMap[actionTitle] || actionTitle;
  };

  const translatedTitle = getActionTitle(action.title);

  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      if (action.disabled) return;
      action?.callback
        ? action?.callback(store.currentView?.selected?.snapshot, action)
        : invokeAction(action, isDeleteAction, store, formRef, t);
      parentRef?.current?.close?.();
    },
    [store.currentView?.selected, action, isDeleteAction, parentRef, store, formRef, t],
  );

  const titleContainer = (
    <Block
      key={action.id}
      tag={Menu.Item}
      size="small"
      onClick={onClick}
      mod={{
        hasSeperator: isDeleteAction,
        hasSubMenu: action.children?.length > 0,
        isSeparator: action.isSeparator,
        isTitle: action.isTitle,
        danger: isDeleteAction,
        disabled: action.disabled,
      }}
      name="actionButton"
      aria-label={translatedTitle}
    >
      <Elem name="titleContainer" {...(action.disabled ? { title: action.disabledReason } : {})}>
        <Elem name="title">{translatedTitle}</Elem>
        {hasChildren ? <Elem name="icon" tag={IconChevronRight} /> : null}
      </Elem>
    </Block>
  );

  if (hasChildren) {
    return (
      <Dropdown.Trigger
        key={action.id}
        align="top-right-outside"
        toggle={false}
        ref={submenuRef}
        content={
          <Block name="actionButton-submenu" tag="ul">
            {action.children.map((childAction) => (
              <ActionButton
                key={childAction.id}
                action={childAction}
                parentRef={parentRef}
                store={store}
                formRef={formRef}
              />
            ))}
          </Block>
        }
      >
        {titleContainer}
      </Dropdown.Trigger>
    );
  }

  return (
    <Tooltip key={action.id} title={action.disabled_reason} disabled={!action.disabled} alignment="bottom-center">
      <div>
        <Menu.Item
          size="small"
          key={action.id}
          variant={isDeleteAction ? "negative" : undefined}
          onClick={onClick}
          className={`actionButton${action.isSeparator ? "_isSeparator" : action.isTitle ? "_isTitle" : ""} ${
            action.disabled ? "actionButton_disabled" : ""
          }`}
          icon={isDeleteAction && <IconTrash />}
          title={action.disabled ? action.disabledReason : null}
          aria-label={translatedTitle}
        >
          {translatedTitle}
        </Menu.Item>
      </div>
    </Tooltip>
  );
};

const invokeAction = (action, destructive, store, formRef, t) => {
  if (action.dialog) {
    const { type: dialogType, text, form, title } = action.dialog;
    const dialog = Modal[dialogType] ?? Modal.confirm;

    // Generate dynamic content for destructive actions
    let dialogTitle = title;
    let dialogText = text;
    let okButtonText = t('dataManager.modal.ok');

    // Handle specific actions with translations
    if (action.id === 'retrieve_tasks_predictions') {
      dialogTitle = t('dataManager.dialogs.retrievePredictions.title');
    }
    if (action.id === 'create_annotations_from_predictions') {
      dialogTitle = t('dataManager.dialogs.createAnnotationsFromPredictions.title');
    }
    if (action.id === 'remove_duplicates') {
      dialogTitle = t('dataManager.dialogs.removeDuplicatedTasks.title');
    }
    if (action.id === 'delete_tasks') {
      dialogTitle = t('dataManager.dialogs.deleteTasks.title');
      dialogText = t('dataManager.dialogs.deleteTasks.text');
    }
    if (action.id === 'delete_tasks_annotations') {
      dialogTitle = t('dataManager.dialogs.deleteAnnotations.title');
      dialogText = t('dataManager.dialogs.deleteAnnotations.text');
    }

    if (destructive && !title) {
      // Extract object type from action ID and title
      const objectMap = {
        delete_tasks: "tasks",
        delete_annotations: "annotations",
        delete_predictions: "predictions",
        delete_reviews: "reviews",
        delete_reviewers: "review assignments",
        delete_annotators: "annotator assignments",
        delete_ground_truths: "ground truths",
      };

      const objectType = objectMap[action.id] || action.title.toLowerCase().replace("delete ", "");
      dialogTitle = `${t('dataManager.dialogs.deleteSelected')} ${objectType}?`;

      // Convert to title case for button text
      const titleCaseObject = objectType
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      okButtonText = t('dataManager.dialogs.deleteButton', { objectType: titleCaseObject });
    }

    if (destructive && !form) {
      // Use standardized warning message for simple delete actions
      const objectType = dialogTitle ? dialogTitle.replace(t('dataManager.dialogs.deleteSelected') + " ", "").replace("?", "") : t('dataManager.dialogs.items');
      dialogText = t('dataManager.dialogs.deleteWarning', { objectType });
    }

    dialog({
      title: dialogTitle ? dialogTitle : destructive ? t('dataManager.dialogs.destructiveAction') || "Destructive action" : t('dataManager.dialogs.confirmAction') || "Confirm action",
      body: <DialogContent text={dialogText} form={form} formRef={formRef} store={store} action={action} />,
      buttonLook: destructive ? "negative" : "primary",
      okText: destructive ? okButtonText : undefined,
      onOk() {
        const body = formRef.current?.assembleFormData({ asJSON: true });

        store.SDK.invoke("actionDialogOk", action.id, { body });
        store.invokeAction(action.id, { body });
      },
      closeOnClickOutside: false,
    });
  } else {
    store.invokeAction(action.id);
  }
};

export const ActionsButton = injector(
  observer(({ store, size, hasSelected, ...rest }) => {
    const { t } = useTranslation();
    const formRef = useRef();
    const selectedCount = store.currentView.selectedCount;
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const actions = useMemo(() => {
      return store.availableActions.filter((a) => !a.hidden).sort((a, b) => a.order - b.order);
    }, [store.availableActions]);

    useEffect(() => {
      if (isOpen && actions.length === 0) {
        setIsLoading(true);
        store.fetchActions().finally(() => {
          setIsLoading(false);
        });
      }
    }, [isOpen, actions, store]);

    const actionButtons = actions.map((action) => (
      <ActionButton key={action.id} action={action} parentRef={formRef} store={store} formRef={formRef} />
    ));
    const recordTypeLabel = isFFLOPSE3 && store.SDK.type === "DE" ? t('dataManager.toolbar.record') : t('dataManager.toolbar.task');

    return (
      <Dropdown.Trigger
        content={
          <Menu size="compact">{isLoading ? <Menu.Item disabled>{t('dataManager.toolbar.loadingActions')}</Menu.Item> : actionButtons}</Menu>
        }
        openUpwardForShortViewport={false}
        disabled={!hasSelected}
        onToggle={setIsOpen}
      >
        <Button
          size={size}
          variant="neutral"
          look="outlined"
          disabled={!hasSelected}
          trailing={<IconChevronDown />}
          aria-label={t('dataManager.toolbar.tasksActions')}
          {...rest}
        >
          {selectedCount > 0 ? t('dataManager.toolbar.selectedItems', { count: selectedCount, type: recordTypeLabel }) : t('dataManager.toolbar.actions')}
        </Button>
      </Dropdown.Trigger>
    );
  }),
);
