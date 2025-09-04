import { Badge, Card, List, Popconfirm } from "antd";
import { Button } from "@humansignal/ui";
import { Tooltip } from "@humansignal/ui";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
  StopOutlined,
  WindowsOutlined,
} from "@ant-design/icons";

import Utils from "../../utils";
import styles from "./Annotations.module.scss";


/** @deprecated this file is not used; DraftPanel is moved to separate component */

export const DraftPanel = observer(({ item }) => {
  const { t } = useTranslation();
  if (!item.draftSaved && !item.versions.draft) return null;
  const saved = item.draft && item.draftSaved ? ` ${t('editor.annotations.draft.saved')} ${Utils.UDate.prettyDate(item.draftSaved)}` : "";

  if (!item.selected) {
    if (!item.draft) return null;
    return <div>{t('editor.annotations.draft.label')}{saved}</div>;
  }
  if (!item.versions.result || !item.versions.result.length) {
    return <div>{saved ? `${t('editor.annotations.draft.label')}${saved}` : t('editor.annotations.draft.notSubmitted')}</div>;
  }
  return (
    <div>
      <Button
        look="string"
        onClick={item.toggleDraft}
        tooltip={item.draftSelected ? t('editor.annotations.draft.switchToSubmitted') : t('editor.annotations.draft.switchToCurrent')}
      >
        {item.draftSelected ? t('editor.annotations.draft.label') : t('editor.annotations.draft.submitted')}
      </Button>
      {saved}
    </div>
  );
});

const DeleteAnnotationButton = observer(({ onConfirm }) => {
  const { t } = useTranslation();

  return (
    <Tooltip placement="topLeft" title={t('editor.annotations.deleteTooltip', 'Delete selected annotation')}>
      <Popconfirm
        placement="bottomLeft"
        title={t('editor.annotations.deleteConfirm', 'Please confirm you want to delete this annotation')}
        onConfirm={onConfirm}
        okText={t('common.delete', 'Delete')}
        okType="danger"
        cancelText={t('common.cancel', 'Cancel')}
      >
        <Button size="small" look="string" variant="negative" aria-label={t('editor.annotations.deleteTooltip', 'Delete selected annotation')}>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    </Tooltip>
  );
});

const Annotation = observer(({ item, store }) => {
  const { t } = useTranslation();
  
  const removeHoney = () => (
    <Button
      size="small"
      tooltip={t('editor.annotations.groundTruth.unsetTitle')}
      onClick={(ev) => {
        ev.preventDefault();
        item.setGroundTruth(false);
      }}
      aria-label={t('editor.annotations.groundTruth.unsetLabel')}
    >
      <StarOutlined />
    </Button>
  );

  const setHoney = () => {
    const title = item.ground_truth ? t('editor.annotations.groundTruth.unsetTitle') : t('editor.annotations.groundTruth.setTitle');

    return (
      <Button
        size="small"
        look="string"
        tooltip={title}
        onClick={(ev) => {
          ev.preventDefault();
          item.setGroundTruth(!item.ground_truth);
        }}
        aria-label={item.ground_truth ? t('editor.annotations.groundTruth.unsetLabel') : t('editor.annotations.groundTruth.setLabel')}
      >
        {item.ground_truth ? <StarFilled /> : <StarOutlined />}
      </Button>
    );
  };

  const toggleVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    item.toggleVisibility();
    const c = document.getElementById(`c-${item.id}`);

    if (c) c.style.display = item.hidden ? "none" : "unset";
  };

  const highlight = () => {
    const c = document.getElementById(`c-${item.id}`);

    if (c) c.classList.add("hover");
  };

  const unhighlight = () => {
    const c = document.getElementById(`c-${item.id}`);

    if (c) c.classList.remove("hover");
  };

  /**
   * Default badge for saved annotations
   */
  let badge = <Badge status="default" />;

  /**
   *
   */
  let annotationID;

  /**
   * Title of card
   */
  if (item.userGenerate && !item.sentUserGenerate) {
    annotationID = <span className={styles.title}>{t('editor.annotations.unsavedAnnotation')}</span>;
  } else {
    if (item.pk) {
      annotationID = <span className={styles.title}>ID {item.pk}</span>;
    } else if (item.id) {
      annotationID = <span className={styles.title}>ID {item.id}</span>;
    }
  }

  /**
   * Badge for processing of user generate annotation
   */
  if (item.userGenerate) {
    badge = <Badge status="processing" />;
  }

  /**
   * Badge for complete of user generate annotation
   */
  if (item.userGenerate && item.sentUserGenerate) {
    badge = <Badge status="success" />;
  }

  const btnsView = () => {
    const confirm = () => {
      // ev.preventDefault();
      // debugger;
      item.list.deleteAnnotation(item);
    };

    return (
      <div className={styles.buttons}>
        {store.hasInterface("ground-truth") && (item.ground_truth ? removeHoney() : setHoney())}
        &nbsp;
        {store.hasInterface("annotations:delete") && (
          <DeleteAnnotationButton onConfirm={confirm} />
        )}
      </div>
    );
  };

  return (
    <List.Item
      key={item.id}
      className={item.selected ? `${styles.annotation} ${styles.annotation_selected}` : styles.annotation}
      onClick={() => {
        !item.selected && store.annotationStore.selectAnnotation(item.id);
      }}
      onMouseEnter={highlight}
      onMouseLeave={unhighlight}
    >
      <div className={styles.annotationcard}>
        <div>
          <div className={styles.title}>
            {badge}
            {annotationID}
          </div>
          {item.pk ? t('editor.annotations.created') : t('editor.annotations.started')}
          <i>{item.createdAgo ? ` ${item.createdAgo} ${t('editor.annotations.ago')}` : ` ${Utils.UDate.prettyDate(item.createdDate)}`}</i>
          {item.createdBy && item.pk ? ` ${t('editor.annotations.by')} ${item.createdBy}` : null}
          <DraftPanel item={item} />
        </div>
        {/* platform uses was_cancelled so check both */}
        {store.hasInterface("skip") && (item.skipped || item.was_cancelled) && (
          <Tooltip alignment="top-left" title={t('editor.annotations.skippedAnnotation')}>
            <StopOutlined className={styles.skipped} />
          </Tooltip>
        )}
        {store.annotationStore.viewingAll && (
          <Button
            size="small"
            look="outlined"
            onClick={toggleVisibility}
            aria-label={t('editor.annotations.toggleVisibility')}
          >
            {item.hidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </Button>
        )}
        {item.selected && btnsView()}
      </div>
    </List.Item>
  );
});

const Annotations = observer(({ store }) => {
  const { t } = useTranslation();

  const title = (
    <div className={`${styles.title} ${styles.titlespace}`}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3>{t('editor.annotations.title')}</h3>
      </div>

      <div style={{ marginRight: "1px" }}>
        {store.hasInterface("annotations:add-new") && (
          <Button
            size="small"
            tooltip={t('editor.annotations.createNew')}
            onClick={(ev) => {
              ev.preventDefault();
              const c = store.annotationStore.createAnnotation();

              store.annotationStore.selectAnnotation(c.id);
            }}
            aria-label={t('editor.annotations.createNew')}
          >
            <PlusOutlined />
          </Button>
        )}
        &nbsp;
        <Button
          size="small"
          tooltip={t('editor.annotations.viewAll')}
          look={store.annotationStore.viewingAll ? "filled" : "outlined"}
          onClick={(ev) => {
            ev.preventDefault();
            store.annotationStore.toggleViewingAllAnnotations();
          }}
          aria-label={t('editor.annotations.toggleViewAll')}
        >
          <WindowsOutlined />
        </Button>
      </div>
    </div>
  );

  const content = store.annotationStore.annotations.map((c) => <Annotation key={c.id} item={c} store={store} />);

  return (
    <Card title={title} size="small" bodyStyle={{ padding: "0", paddingTop: "1px" }}>
      <List>{store.annotationStore.annotations ? content : <p>{t('editor.annotations.noAnnotationsYet')}</p>}</List>
    </Card>
  );
});

export default Annotations;
