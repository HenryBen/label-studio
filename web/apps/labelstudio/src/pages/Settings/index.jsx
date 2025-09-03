import { SidebarMenu } from "../../components/SidebarMenu/SidebarMenu";
import { WebhookPage } from "../WebhookPage/WebhookPage";
import { DangerZone } from "./DangerZone";
import { GeneralSettings } from "./GeneralSettings";
import { AnnotationSettings } from "./AnnotationSettings";
import { LabelingSettings } from "./LabelingSettings";
import { MachineLearningSettings } from "./MachineLearningSettings/MachineLearningSettings";
import { PredictionsSettings } from "./PredictionsSettings/PredictionsSettings";
import { StorageSettings } from "./StorageSettings/StorageSettings";
import { isInLicense, LF_CLOUD_STORAGE_FOR_MANAGERS } from "../../utils/license-flags";
import { useTranslation } from "react-i18next";
import "./settings.scss";

const isAllowCloudStorage = !isInLicense(LF_CLOUD_STORAGE_FOR_MANAGERS);

export const MenuLayout = ({ children, ...routeProps }) => {
  const { t } = useTranslation();
  
  // Create translated menu items using each component's title function
  const translatedMenuItems = [
    { ...GeneralSettings, title: typeof GeneralSettings.title === 'function' ? GeneralSettings.title({ t }) : t('settings.general', 'General') },
    { ...LabelingSettings, title: typeof LabelingSettings.title === 'function' ? LabelingSettings.title({ t }) : t('settings.labelingInterface', 'Labeling Interface') },
    { ...AnnotationSettings, title: typeof AnnotationSettings.title === 'function' ? AnnotationSettings.title({ t }) : t('annotationSettings.title', 'Annotation') },
    { ...MachineLearningSettings, title: typeof MachineLearningSettings.title === 'function' ? MachineLearningSettings.title({ t }) : t('settings.model', 'Model') },
    { ...PredictionsSettings, title: typeof PredictionsSettings.title === 'function' ? PredictionsSettings.title({ t }) : t('settings.predictions', 'Predictions') },
    isAllowCloudStorage && { ...StorageSettings, title: typeof StorageSettings.title === 'function' ? StorageSettings.title({ t }) : t('settings.cloudStorage', 'Cloud Storage') },
    { ...WebhookPage, title: t('settings.webhooks', 'Webhooks') },
    { ...DangerZone, title: typeof DangerZone.title === 'function' ? DangerZone.title({ t }) : t('settings.dangerZone', 'Danger Zone') },
  ].filter(Boolean);
  
  return (
    <SidebarMenu
      menuItems={translatedMenuItems}
      path={routeProps.match.url}
      children={children}
    />
  );
};

const pages = {
  AnnotationSettings,
  LabelingSettings,
  MachineLearningSettings,
  PredictionsSettings,
  WebhookPage,
  DangerZone,
};

isAllowCloudStorage && (pages.StorageSettings = StorageSettings);

export const SettingsPage = {
  title: ({ t }) => t('settings.title'),
  path: "/settings",
  exact: true,
  layout: MenuLayout,
  component: GeneralSettings,
  pages,
};
