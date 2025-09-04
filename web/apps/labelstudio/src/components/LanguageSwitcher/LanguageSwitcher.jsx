import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, IconGlobe } from '@humansignal/ui';
import { Dropdown } from '../Dropdown/Dropdown';
import { Menu } from '../Menu/Menu';
import './LanguageSwitcher.scss';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' }
];

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode).then(() => {
      // Trigger custom event for editor i18n system
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: languageCode }));
    });
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="language-switcher">
      <Dropdown
        align="right"
        content={
          <Menu>
            {languages.map((language) => (
              <Menu.Item
                key={language.code}
                label={language.name}
                onClick={() => handleLanguageChange(language.code)}
                active={language.code === i18n.language}
              />
            ))}
          </Menu>
        }
      >
        <Button
          className="language-switcher__button"
          variant="neutral"
          look="outlined"
          size="small"
          tooltip={t('languageSwitcher.tooltip', 'Switch Language')}
          leading={<IconGlobe className="language-switcher__icon" />}
          data-testid="language-switcher"
        >
          <span className="language-switcher__text">{currentLanguage.name}</span>
        </Button>
      </Dropdown>
    </div>
  );
};