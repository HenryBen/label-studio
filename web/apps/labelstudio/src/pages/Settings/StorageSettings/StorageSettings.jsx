import { Typography } from "@humansignal/ui";
import { useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "../../../utils/bem";
import { isInLicense, LF_CLOUD_STORAGE_FOR_MANAGERS } from "../../../utils/license-flags";
import { StorageSet } from "./StorageSet";

const isAllowCloudStorage = !isInLicense(LF_CLOUD_STORAGE_FOR_MANAGERS);

export const StorageSettings = () => {
  const { t } = useTranslation();
  const rootClass = cn("storage-settings"); // TODO: Remove in the next BEM cleanup
  const history = useHistory();
  const location = useLocation();
  const sourceStorageRef = useRef();

  // Handle auto-open query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get("open") === "source") {
      // Auto-trigger "Add Source Storage" modal
      setTimeout(() => {
        sourceStorageRef.current?.openAddModal();
      }, 100); // Small delay to ensure component is mounted

      // Clean URL by removing the query parameter
      history.replace(location.pathname);
    }
  }, [location, history]);

  return isAllowCloudStorage ? (
    <section className="max-w-[680px]">
      <Typography variant="headline" size="medium" className="mb-base">
        {t('storage.cloudStorage')}
      </Typography>
      <Typography size="small" className="text-neutral-content-subtler mb-wider">
        {t('storage.description')}
      </Typography>

      <div className="grid grid-cols-2 gap-8">
        <StorageSet
          ref={sourceStorageRef}
          title={t('storage.sourceCloudStorage')}
          buttonLabel={t('storage.addSourceStorage')}
          rootClass={rootClass}
        />

        <StorageSet
          title={t('storage.targetCloudStorage')}
          target="export"
          buttonLabel={t('storage.addTargetStorage')}
          rootClass={rootClass}
        />
      </div>
    </section>
  ) : null;
};

StorageSettings.title = ({ t }) => t('settings.cloudStorage');
StorageSettings.path = "/storage";
