import { lazy } from "react";

export const loadI18n = async () => {
  const { default: i18n } = await import("i18next");
  const { initReactI18next } = await import("react-i18next");
  const { default: Backend } = await import("i18next-http-backend");

  const storedLanguage = localStorage.getItem("language");
  const browserLanguage = window.navigator.language.slice(0, 2);

  const initialLanguage = storedLanguage || browserLanguage;

  await i18n
    .use(initReactI18next)
    .use(Backend)
    .init({
      lng: initialLanguage,
      fallbackLng: "ru",
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      interpolation: { escapeValue: false },
    });

  return i18n;
};

export const LocalizationLoader = lazy(() =>
  loadI18n().then(() => ({ default: () => null })),
);
