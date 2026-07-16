import type { UsersFilterField, UsersSortField } from "@/entities/user";

export type UserTableColumnKey =
  | "lastName"
  | "firstName"
  | "maidenName"
  | "age"
  | "gender"
  | "phone"
  | "email"
  | "country"
  | "city";

export type UserTableFilterType = "text" | "number" | "select";

export interface UserTableColumn {
  key: UserTableColumnKey;
  titleKey: string;
  initialWidth: number;
  minWidth: number;
  sortField?: UsersSortField;
  filterField?: UsersFilterField;
  filterType?: UserTableFilterType;
}
