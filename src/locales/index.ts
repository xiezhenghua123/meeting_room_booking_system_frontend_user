import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import zh from './zh.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
        label: 'English'
      },
      zh: {
        translation: zh,
        label: '简体中文'
      }
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;