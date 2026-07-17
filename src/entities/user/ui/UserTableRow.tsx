import type { KeyboardEvent, ReactNode } from "react";
import type { User, UserTableColumnKey } from "../model";
import { USER_TABLE_COLUMNS } from "../config";
import { useTranslation } from "react-i18next";

interface UserTableRowProps {
  user: User;
  onSelect: (userId: number) => void;
}

function getCellValue(user: User, columnKey: UserTableColumnKey): ReactNode {
  switch (columnKey) {
    case "lastName":
      return user.lastName;

    case "firstName":
      return user.firstName;

    case "maidenName":
      return user.maidenName || "—";

    case "age":
      return user.age;

    case "gender":
      return user.gender;

    case "phone":
      return user.phone;

    case "email":
      return user.email;

    case "country":
      return user.address.country;

    case "city":
      return user.address.city;

    default:
      return "—";
  }
}

export function UserTableRow({ user, onSelect }: UserTableRowProps) {
  const { t } = useTranslation("user");

  const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(user.id);
    }
  };

  return (
    <tr
      tabIndex={0}
      role="button"
      className="border-b border-slate-200 transition-colors last:border-b-0 hover:bg-slate-50 hover:cursor-pointer"
      onClick={() => {
        onSelect(user.id);
      }}
      onKeyDown={handleKeyDown}
    >
      {USER_TABLE_COLUMNS.map((column) => {
        const value = getCellValue(user, column.key);

        const displayedValue =
          column.key === "gender" ? t(`users.gender.${String(value)}`) : value;

        return (
          <td
            key={column.key}
            className="overflow-hidden px-3 py-3 text-sm text-ellipsis whitespace-nowrap text-slate-700"
            title={String(displayedValue)}
          >
            {displayedValue}
          </td>
        );
      })}
    </tr>
  );
}
