import type {
  SortOrder,
  UsersSortField,
  UserTableColumn,
  UserTableColumnKey,
  UserTableColumnWidths,
} from "@/entities/user";

export interface SortingColumn {
  key: UserTableColumnKey;
  titleKey: string;
  sortField?: UsersSortField;
}

export interface UserSortingRowProps {
  columnWidths: UserTableColumnWidths;
  columns: UserTableColumn[];
  sortField: UsersSortField | null;
  sortOrder: SortOrder | null;
  onSort: (field: UsersSortField) => void;
  onColumnResize: (columnKey: UserTableColumnKey, width: number) => void;
}
