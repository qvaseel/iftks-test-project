import type { User } from "../model";

interface UsersTableRowProps {
  user: User;
}

export function UsersTableRow({ user }: UsersTableRowProps) {
  return (
    <tr
      className="
        border-t border-slate-200
        transition-colors
        hover:bg-slate-50
      "
    >
      <td className="px-3 py-3">{user.lastName}</td>

      <td className="px-3 py-3">{user.firstName}</td>

      <td className="px-3 py-3">{user.maidenName || "—"}</td>

      <td className="px-3 py-3">{user.age}</td>

      <td className="px-3 py-3">{user.gender}</td>

      <td className="whitespace-nowrap px-3 py-3">{user.phone}</td>

      <td className="px-3 py-3">{user.email}</td>

      <td className="px-3 py-3">{user.address.country}</td>

      <td className="px-3 py-3">{user.address.city}</td>
    </tr>
  );
}
