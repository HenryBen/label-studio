import { Button } from "@humansignal/ui";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLanguage).then(() => {
      // Trigger custom event for editor i18n system
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: newLanguage }));
    });
  };

  return (
    <Button
      variant="neutral"
      size="small"
      onClick={toggleLanguage}
      className="text-sm"
      aria-label={t('languageSwitcher.switchLanguage')}
    >
      {i18n.language === 'en' ? '中文' : 'English'}
    </Button>
  );
};