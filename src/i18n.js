import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from "/public/locales/ru/translationRu.json"
import uz from "/public/locales/uzb/translationUzb.json"

const resources = {
    ru: {
        translation: ru
    },
    uz: {
        translation: uz
    }
};


i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)

    .init({
        supportedLngs: ['uz', 'ru'],
        fallbackLng: 'ru',
        resources,
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;
