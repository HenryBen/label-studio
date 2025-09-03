// i18n utility for datamanager that integrates with the main i18n system
// Import translations directly from the locale files
import en from '../../../../apps/labelstudio/src/i18n/locales/en.json';
import zh from '../../../../apps/labelstudio/src/i18n/locales/zh.json';

// Simple translation function that mimics i18next behavior
const translations = {
  en: en,
  zh: zh
};

// Get current language from localStorage or default to 'en'
let currentLanguage = 'en';
try {
  const stored = localStorage.getItem('i18nextLng');
  if (stored && translations[stored]) {
    currentLanguage = stored;
  }
} catch (e) {
  // Fallback to 'en' if localStorage is not available
}

// Helper function to get nested object value by dot notation
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
}

export const i18n = {
  t: (key, options = {}) => {
    try {
      const translation = getNestedValue(translations[currentLanguage], key);
      if (translation !== null) {
        return translation;
      }
      // Fallback to English if key not found in current language
      const fallback = getNestedValue(translations.en, key);
      if (fallback !== null) {
        return fallback;
      }
      // Return key if no translation found
      console.warn(`Translation key not found: ${key}`);
      return key;
    } catch (error) {
      console.warn(`Translation error for key ${key}:`, error);
      return key;
    }
  },
  
  changeLanguage: (lng) => {
    if (translations[lng]) {
      currentLanguage = lng;
      try {
        localStorage.setItem('i18nextLng', lng);
      } catch (e) {
        // Ignore localStorage errors
      }
      return Promise.resolve(lng);
    }
    return Promise.reject(new Error(`Language ${lng} not supported`));
  },
  
  get language() {
    return currentLanguage;
  },
  
  exists: (key) => {
    return getNestedValue(translations[currentLanguage], key) !== null ||
           getNestedValue(translations.en, key) !== null;
  }
};

export default i18n;