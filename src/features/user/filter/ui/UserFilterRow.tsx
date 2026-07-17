import { useTranslation } from "react-i18next";
import type { ActiveFilter, UsersFilterField } from "@/entities/user";
import { Input, Select } from "@/shared/ui";

type FilterControlType = "text" | "number" | "select";

interface FilterColumn {
  key: string;
  titleKey: string;
  filterField?: UsersFilterField;
  filterType?: FilterControlType;
}

interface UsersFilterRowProps {
  columns: readonly FilterColumn[];
  activeFilter: ActiveFilter | null;
  onFilterChange: (field: UsersFilterField, value: string) => void;
}

export function UserFilterRow({
  columns,
  activeFilter,
  onFilterChange,
}: UsersFilterRowProps) {
  const { t } = useTranslation("user");

  const genderOptions = [
    {
      value: "male",
      label: t("users.gender.male"),
    },
    {
      value: "female",
      label: t("users.gender.female"),
    },
  ];

  return (
    <tr>
      {columns.map((column) => {
        const filterField = column.filterField;
        const filterType = column.filterType;

        if (!filterField || !filterType) {
          return (
            <th
              key={column.key}
              className="border-b border-slate-200 bg-slate-50 px-2 py-2"
            />
          );
        }

        const title = t(column.titleKey);

        const value =
          activeFilter?.key === filterField ? activeFilter.value : "";

        return (
          <th
            key={column.key}
            className="border-b border-slate-200 bg-slate-50 px-2 py-2 font-normal"
          >
            {filterType === "select" ? (
              <Select
                value={value}
                options={genderOptions}
                placeholder={t("users.filters.all")}
                aria-label={t("users.filters.byColumn", {
                  column: title,
                })}
                onChange={(event) => {
                  onFilterChange(filterField, event.target.value);
                }}
              />
            ) : (
              <Input
                type={filterType === "number" ? "number" : "text"}
                min={filterType === "number" ? 0 : undefined}
                value={value}
                placeholder={t("users.filters.placeholder")}
                aria-label={t("users.filters.byColumn", {
                  column: title,
                })}
                onChange={(event) => {
                  onFilterChange(filterField, event.target.value);
                }}
              />
            )}
          </th>
        );
      })}
    </tr>
  );
}
