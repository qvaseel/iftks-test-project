import { makeAutoObservable, runInAction } from "mobx";
import type {
  ActiveFilter,
  SortOrder,
  User,
  UsersFilterField,
  UsersSortField,
} from "./types";
import { getUsers } from "../api";

export class UsersTableStore {
  users: User[] = [];
  total = 0;
  page = 1;
  pageSize = 10;
  isLoading = false;
  error: string | null = null;
  sortField: UsersSortField | null = null;
  sortOrder: SortOrder = null;
  activeFilter: ActiveFilter | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get skip(): number {
    return (this.page - 1) * this.pageSize;
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  async loadUsers(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await getUsers({
        limit: this.pageSize,
        skip: this.skip,
        sortBy: this.sortField ?? undefined,
        order: this.sortOrder ?? undefined,
        filter: this.activeFilter ?? undefined,
      });

      runInAction(() => {
        this.users = response.users;
        this.total = response.total;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error
            ? error.message
            : "Не удалось загрузить пользователей";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.page = page;
    void this.loadUsers();
  }

  setPageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;

    void this.loadUsers();
  }

  setSorting(field: UsersSortField): void {
    if (this.sortField !== field) {
      this.sortField = field;
      this.sortOrder = "asc";
    } else if (this.sortOrder === "asc") {
      this.sortOrder = "desc";
    } else {
      this.sortField = null;
      this.sortOrder = null;
    }

    this.page = 1;

    void this.loadUsers();
  }

  setFilter(field: UsersFilterField, value: string): void {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      this.activeFilter = null;
    } else {
      this.activeFilter = {
        key: field,
        value: trimmedValue,
      };
    }

    this.page = 1;
  }

  applyFilter(): void {
    void this.loadUsers();
  }

  clearFilter(): void {
    this.activeFilter = null;
    this.page = 1;

    void this.loadUsers();
  }

  retry(): void {
    void this.loadUsers();
  }
}
