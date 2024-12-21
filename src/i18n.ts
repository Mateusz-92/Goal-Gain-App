import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';

import translations from './locales/pl/translation.json';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false,
    },
    lng: 'pl',
    resources: {
      pl: {
        common: translations,
      },
    },
  });

export default i18n;
