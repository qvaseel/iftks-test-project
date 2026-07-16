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
  height: number;
  weight: number;
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

export type SortOrder = "asc" | "desc";

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
