import type { User } from "@/entities/user";
import type { ReactNode } from "react";
import type { UserTableColumnKey } from "../model";
import { USER_TABLE_COLUMNS } from "../config";

interface UserTableRowProps {
  user: User;
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

export function UserTableRow({ user }: UserTableRowProps) {
  return (
    <tr
      className="
        border-b border-slate-200
        transition-colors
        last:border-b-0
        hover:bg-slate-50
      "
    >
      {USER_TABLE_COLUMNS.map((column) => {
        const value = getCellValue(user, column.key);

        return (
          <td
            key={column.key}
            className="
        overflow-hidden
        px-3 py-3
        text-sm text-ellipsis
        whitespace-nowrap
        text-slate-700
      "
            title={String(value)}
          >
            {value}
          </td>
        );
      })}
    </tr>
  );
}
