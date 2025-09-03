import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import zh from './locales/zh.json';

const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};

// 检查localStorage中是否有语言设置，如果没有则设置默认语言为中文
const getInitialLanguage = () => {
  const stored = localStorage.getItem('i18nextLng');
  if (!stored) {
    // 如果没有存储的语言设置，默认使用中文
    localStorage.setItem('i18nextLng', 'zh');
    return 'zh';
  }
  return stored;
};

const initialLanguage = getInitialLanguage();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage, // 使用初始化确定的语言
    fallbackLng: 'en', // 保留fallback以防翻译缺失
    defaultNS: 'translation',
    debug: process.env.NODE_ENV === 'development',
    
    detection: {
      order: ['localStorage'], // 只从localStorage读取
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    console.log('i18n initialized successfully with language:', i18n.language);
  })
  .catch((error) => {
    console.error('i18n initialization failed:', error);
  });

// Ensure i18n is ready before exporting
if (!i18n.isInitialized) {
  console.warn('i18n not yet initialized');
}

export default i18n;