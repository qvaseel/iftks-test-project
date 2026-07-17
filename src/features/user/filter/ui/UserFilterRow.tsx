import { useTranslation } from "react-i18next";
import { Input, Select } from "@/shared/ui";
import type { UsersFilterRowProps } from "../model";
import { useDebounce } from "@/shared/lib";
import { useEffect, useRef } from "react";

export function UserFilterRow({
  columns,
  activeFilter,
  onFilterChange,
  onApplyFilter,
}: UsersFilterRowProps) {
  const { t } = useTranslation("user");

  const isFirstRender = useRef(true);

  const debouncedFilter = useDebounce(activeFilter, 500);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onApplyFilter();
  }, [debouncedFilter, onApplyFilter]);

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
              className="border-b border-slate-300 bg-slate-50 px-1.5 py-1.5 sm:px-2 sm:py-2"
            />
          );
        }

        const title = t(column.titleKey);

        const value =
          activeFilter?.key === filterField ? activeFilter.value : "";

        return (
          <th
            key={column.key}
            className="border-b border-slate-300 bg-slate-50 px-1.5 py-1.5 sm:px-2 sm:py-2 font-normal"
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
