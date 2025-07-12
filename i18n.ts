import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/public/locales/en/common.json";
import es from "@/public/locales/es/common.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  fallbackLng: "es",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
