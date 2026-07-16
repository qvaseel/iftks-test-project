import { useTranslation } from "react-i18next";
import { USER_TABLE_COLUMNS } from "../config";

export function UserTableHeader() {
  const { t } = useTranslation("table");

  return (
    <thead className="bg-slate-100">
      <tr>
        {USER_TABLE_COLUMNS.map((column) => (
          <th
            key={column.key}
            scope="col"
            className="
              border-b border-slate-200
              px-3 py-3
              text-left text-sm font-semibold
              text-slate-700
            "
          >
            {t(column.titleKey)}
          </th>
        ))}
      </tr>
    </thead>
  );
}
