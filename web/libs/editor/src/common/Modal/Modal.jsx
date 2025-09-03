import { createRef } from "react";
import { render } from "react-dom";
import { useTranslation } from "react-i18next";
import { cn } from "../../utils/bem";
import { Button } from "@humansignal/ui";
import { Space } from "../Space/Space";
import { Modal } from "./ModalPopup";

const standaloneModal = (props) => {
  const modalRef = createRef();
  const rootDiv = document.createElement("div");

  rootDiv.className = cn("modal-holder").toClassName();

  document.body.appendChild(rootDiv);

  const renderModal = (props, animate) => {
    render(
      <Modal
        ref={modalRef}
        {...props}
        onHide={() => {
          props.onHidden?.();
          rootDiv.remove();
        }}
        animateAppearance={animate}
      />,
      rootDiv,
    );
  };

  renderModal(props, true);

  return {
    update(newProps) {
      renderModal({ ...props, ...(newProps ?? {}) }, false);
    },
    close() {
      modalRef.current.hide();
    },
  };
};

export const confirm = ({ okText, onOk, cancelText, onCancel, buttonLook, ...props }) => {
  const ConfirmModal = () => {
    const { t } = useTranslation();
    
    return (
      <Space align="end">
        <Button
          onClick={() => {
            onCancel?.();
            modal.close();
          }}
          size="small"
          look="outlined"
          autoFocus
          aria-label={t('common.cancel')}
        >
          {cancelText ?? t('common.cancel')}
        </Button>

        <Button
          onClick={() => {
            onOk?.();
            modal.close();
          }}
          size="small"
          look={buttonLook ?? "primary"}
        >
          {okText ?? "OK"}
        </Button>
      </Space>
    );
  };

  const modal = standaloneModal({
    ...props,
    allowClose: false,
    footer: <ConfirmModal />,
  });

  return modal;
};

export const info = ({ okText, onOkPress, ...props }) => {
  const modal = standaloneModal({
    ...props,
    footer: (
      <Space align="end">
        <Button
          onClick={() => {
            onOkPress?.();
            modal.close();
          }}
          size="small"
          look="primary"
        >
          {okText ?? "OK"}
        </Button>
      </Space>
    ),
  });

  return modal;
};

export { standaloneModal as modal };
export { Modal };

Object.assign(Modal, {
  info,
  confirm,
  modal: standaloneModal,
});
