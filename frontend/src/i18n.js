// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import de tes fichiers de traduction (json ou gestionnaire de backend)
import commonEn from './locales/en/common.json';
import commonFr from './locales/fr/common.json';
import commonAr from './locales/ar/common.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: commonEn },
            fr: { translation: commonFr },
            ar: { translation: commonAr },
        },
        lng: localStorage.getItem('i18nextLng') || 'fr', // initial
        fallbackLng: 'fr',
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
    });

export default i18n;