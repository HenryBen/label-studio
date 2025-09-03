import { Button } from "@humansignal/ui";
import { modal } from "../../components/Modal/Modal";
import { useModalControls } from "../../components/Modal/ModalPopup";
import { Space } from "../../components/Space/Space";
import { cn } from "../../utils/bem";
import { useTranslation } from "react-i18next";

export const WebhookDeleteModal = ({ onDelete }) => {
  const { t } = useTranslation();
  
  return modal({
    title: t('webhooks.deleteConfirmTitle'),
    body: () => {
      const ctrl = useModalControls();
      const rootClass = cn("webhook-delete-modal");
      return (
        <div className={rootClass}>
          <div className={rootClass.elem("modal-text")}>
            {t('webhooks.deleteConfirmMessage')}
          </div>
        </div>
      );
    },
    footer: () => {
      const ctrl = useModalControls();
      const rootClass = cn("webhook-delete-modal");
      return (
        <Space align="end">
          <Button
            look="outlined"
            onClick={() => {
              ctrl.hide();
            }}
            aria-label={t('webhooks.aria.cancelWebhookDeletion')}
          >
            {t('webhooks.cancel')}
          </Button>
          <Button
            variant="negative"
            onClick={async () => {
              await onDelete();
              ctrl.hide();
            }}
            aria-label={t('webhooks.aria.confirmWebhookDeletion')}
          >
            {t('webhooks.deleteWebhook')}
          </Button>
        </Space>
      );
    },
    style: { width: 512 },
  });
};
