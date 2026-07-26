import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import arCommon from './ar/common.json';
import enCommon from './en/common.json';

const resources = {
  ar: {
    translation: arCommon,
  },
  en: {
    translation: enCommon,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // default to Arabic
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

// Setup RTL based on language
export const configureRTL = (language: string) => {
  const isRTL = language === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    // Note: app restart might be required for layout changes to fully take effect natively
  }
};

export default i18n;
