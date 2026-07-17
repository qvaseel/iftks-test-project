import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { SortOrder, UsersSortField } from "../model";

interface SortButtonProps {
  field: UsersSortField;
  activeField: UsersSortField | null;
  order: SortOrder | null;
  label: string;
  onSort: (field: UsersSortField) => void;
}

export function SortButton({
  field,
  activeField,
  order,
  label,
  onSort,
}: SortButtonProps) {
  const { t } = useTranslation("user");
  const isActive = field === activeField;

  let icon = <ArrowUpDown />;

  if (isActive && order === "asc") {
    icon = <ArrowUp />;
  }

  if (isActive && order === "desc") {
    icon = <ArrowDown />;
  }

  const getAriaLabel = (): string => {
    if (!isActive) {
      return `${t("sorting.ascending", { column: label })}`;
    }

    if (order === "asc") {
      return `${t("sorting.descending", { column: label })}`;
    }

    return `${t("sorting.clear", { column: label })}`;
  };

  return (
    <button
      type="button"
      className="
        flex h-7 w-7
        shrink-0 items-center justify-center
        rounded
        text-base text-slate-500
        transition-colors
        hover:bg-slate-200
        hover:text-slate-900
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-500
      "
      aria-label={getAriaLabel()}
      title={getAriaLabel()}
      onClick={() => onSort(field)}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}
