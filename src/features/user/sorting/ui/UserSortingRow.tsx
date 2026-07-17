import { useTranslation } from "react-i18next";
import { ColumnHandleResize } from "@/entities/user";
import { SortButton } from "@/shared/ui";
import type { UserSortingRowProps } from "../model";

export function UserSortingRow({
  columns,
  sortField,
  sortOrder,
  onSort,
  onColumnResize,
  columnWidths,
}: UserSortingRowProps) {
  const { t } = useTranslation("user");

  return (
    <tr>
      {columns.map((column) => {
        const title = t(column.titleKey);

        const resizeLabel = t("users.columns.resize", {
          column: title,
        });

        return (
          <th
            key={column.key}
            scope="col"
            className="
              relative
              border-b border-slate-200
              bg-slate-100
              px-3 py-3
              text-left text-sm font-semibold
              text-slate-700
            "
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate">{title}</span>

              {column.sortField && (
                <SortButton
                  field={column.sortField}
                  activeField={sortField}
                  order={sortOrder}
                  label={title}
                  onSort={onSort}
                />
              )}

              <ColumnHandleResize
                label={resizeLabel}
                currentWidth={columnWidths[column.key]}
                initialWidth={column.initialWidth}
                minWidth={column.minWidth}
                onResize={(width) => {
                  onColumnResize(column.key, width);
                }}
              />
            </div>
          </th>
        );
      })}
    </tr>
  );
}
