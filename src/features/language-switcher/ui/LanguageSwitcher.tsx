import { useTranslation } from "react-i18next";
import { Select, type SelectOption } from "@/shared/ui";

type AppLanguage = "ru" | "en";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation("common");

  const currentLanguage = i18n.resolvedLanguage === "en" ? "en" : "ru";

  const options: SelectOption[] = [
    {
      value: "ru",
      label: t("language.ru"),
    },
    {
      value: "en",
      label: t("language.en"),
    },
  ];

  const handleLanguageChange = (language: AppLanguage) => {
    void i18n.changeLanguage(language);

    localStorage.setItem("language", language);

    document.documentElement.lang = language;
  };

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="language-select"
        className="
          hidden text-sm
          text-slate-600
          sm:block
        "
      >
        {t("language.label")}
      </label>

      <Select
        id="language-select"
        value={currentLanguage}
        options={options}
        aria-label={t("language.label")}
        className="w-32"
        onChange={(event) => {
          handleLanguageChange(event.target.value as AppLanguage);
        }}
      />
    </div>
  );
}
