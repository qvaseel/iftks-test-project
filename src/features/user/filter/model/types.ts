import type {
  ActiveFilter,
  UsersFilterField,
  UserTableFilterType,
} from "@/entities/user";

export interface FilterColumn {
  key: string;
  titleKey: string;
  filterField?: UsersFilterField;
  filterType?: UserTableFilterType;
}

export interface UsersFilterRowProps {
  columns: readonly FilterColumn[];
  activeFilter: ActiveFilter | null;
  onFilterChange: (field: UsersFilterField, value: string) => void;
  onApplyFilter: () => void;
}
