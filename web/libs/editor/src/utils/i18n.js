// i18n utility for editor that integrates with the main i18n system
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

// Function to get current language with multiple fallback strategies
function getCurrentLanguage() {
  try {
    // First try to get from localStorage (i18nextLng)
    const stored = localStorage.getItem('i18nextLng');
    if (stored && translations[stored]) {
      return stored;
    }
    
    // Try alternative localStorage keys
    const altStored = localStorage.getItem('language') || localStorage.getItem('locale');
    if (altStored && translations[altStored]) {
      return altStored;
    }
    
    // Check if there's a global i18n instance
    if (typeof window !== 'undefined' && window.i18n && window.i18n.language) {
      const globalLang = window.i18n.language;
      if (translations[globalLang]) {
        return globalLang;
      }
    }
    
    // Check document language
    if (typeof document !== 'undefined' && document.documentElement.lang) {
      const docLang = document.documentElement.lang.split('-')[0];
      if (translations[docLang]) {
        return docLang;
      }
    }
    
  } catch (e) {
    // Ignore errors and fall back to default
  }
  
  return 'en';
}

currentLanguage = getCurrentLanguage();

// Listen for language changes
if (typeof window !== 'undefined') {
  // Listen for localStorage changes
  window.addEventListener('storage', (e) => {
    if (e.key === 'i18nextLng' || e.key === 'language') {
      const newLang = getCurrentLanguage();
      if (newLang !== currentLanguage) {
        currentLanguage = newLang;
        // Trigger re-render by dispatching a custom event
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: newLang }));
      }
    }
  });
  
  // Listen for custom language change events from main app
  window.addEventListener('languageChanged', (e) => {
    const newLang = e.detail || getCurrentLanguage();
    if (newLang !== currentLanguage && translations[newLang]) {
      currentLanguage = newLang;
    }
  });
  
  // Periodically check for language changes (fallback)
  setInterval(() => {
    const newLang = getCurrentLanguage();
    if (newLang !== currentLanguage) {
      currentLanguage = newLang;
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: newLang }));
    }
  }, 1000);
}

// Helper function to get nested object value by dot notation
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
}

// Helper function to handle interpolation like {{count}}
function interpolate(str, options = {}) {
  if (typeof str !== 'string') return str;
  
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return options[key] !== undefined ? options[key] : match;
  });
}

export const i18n = {
  t: (key, options = {}) => {
    try {
      const translation = getNestedValue(translations[currentLanguage], key);
      if (translation !== null) {
        return interpolate(translation, options);
      }
      // Fallback to English if key not found in current language
      const fallback = getNestedValue(translations.en, key);
      if (fallback !== null) {
        return interpolate(fallback, options);
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
        // Also set alternative keys for better compatibility
        localStorage.setItem('language', lng);
      } catch (e) {
        // Ignore localStorage errors
      }
      
      // Trigger language change event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: lng }));
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

// Hook-like function for React components
export const useTranslation = () => {
  // Import React hooks
  const { useState, useEffect } = require('react');
  
  // State to force re-render
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    // Force re-render when language changes by checking current language
    const currentLang = getCurrentLanguage();
    if (currentLang !== currentLanguage) {
      currentLanguage = currentLang;
      forceUpdate({});
    }
    
    // Listen for language change events
    const handleLanguageChange = () => {
      forceUpdate({});
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('languageChanged', handleLanguageChange);
      
      return () => {
        window.removeEventListener('languageChanged', handleLanguageChange);
      };
    }
  }, []);
  
  return {
    t: i18n.t,
    i18n: i18n
  };
};

// Export t function directly for convenience
export const t = i18n.t;

export default i18n;