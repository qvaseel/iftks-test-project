import { useTranslation } from "react-i18next";
import type { SortOrder, UsersSortField } from "@/entities/user";
import { SortButton } from "@/shared/ui";

interface SortingColumn {
  key: string;
  titleKey: string;
  sortField?: UsersSortField;
}

interface UserSortingRowProps {
  columns: SortingColumn[];
  sortField: UsersSortField | null;
  sortOrder: SortOrder | null;
  onSort: (field: UsersSortField) => void;
}

export function UserSortingRow({
  columns,
  sortField,
  sortOrder,
  onSort,
}: UserSortingRowProps) {
  const { t } = useTranslation("user");

  return (
    <tr>
      {columns.map((column) => {
        const title = t(column.titleKey);

        return (
          <th
            key={column.key}
            scope="col"
            className="
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
            </div>
          </th>
        );
      })}
    </tr>
  );
}
