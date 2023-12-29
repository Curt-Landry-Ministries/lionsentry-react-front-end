// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./util/strings/en.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
