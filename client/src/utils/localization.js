import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

//this is where the localization is initialized
//it will automatically detect languages listed here and defined in public/locales folder
const langs = ["en", "am"];
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    whitelist: langs,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    debug: false,
    detection: {
      order: [
        "cookie",
        "localStorage",
        "sessionStorage",
        "querystring",
        "htmlTag",
      ],
      cache: ["cookie"],
    },
  });

export default i18n;
