export type UserGender = "male" | "female";

export interface UserAddress {
  city: string;
  country: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: UserGender;
  email: string;
  phone: string;
  image: string;
  address: UserAddress;
}

export type UsersSortField =
  | "lastName"
  | "firstName"
  | "maidenName"
  | "age"
  | "gender"
  | "phone";

export type UsersFilterField =
  | "lastName"
  | "firstName"
  | "maidenName"
  | "age"
  | "gender"
  | "phone"
  | "email"
  | "address.country"
  | "address.city";

export type SortOrder = "asc" | "desc" | null;

export interface ActiveFilter {
  key: UsersFilterField;
  value: string;
}

export interface GetUsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetUsersRequestParams {
  limit: number;
  skip: number;
  sortBy?: UsersSortField;
  order?: SortOrder;
  filter?: {
    key: UsersFilterField;
    value: string;
  };
}

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

export type UserTableColumnWidths = Record<UserTableColumnKey, number>;

export interface ColumnHandleResizeProps {
  label: string;
  currentWidth: number;
  initialWidth: number;
  minWidth: number;
  onResize: (width: number) => void;
}

export interface ResizeState {
  isResizing: boolean;
  startX: number;
  startWidth: number;
}

export interface UserDetailsProps {
  user: User;
}

export interface DetailItemProps {
  label: string;
  value: string | number | null | undefined;
}
