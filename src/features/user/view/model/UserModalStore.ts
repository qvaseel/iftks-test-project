import { makeAutoObservable, runInAction } from "mobx";
import { getUser } from "../api";
import type { User } from "@/entities/user";

export class UserModalStore {
  selectedUser: User | null = null;
  selectedUserId: number | null = null;
  isUserDetailsLoading = false;
  userDetailsError: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isOpen(): boolean {
    return this.selectedUserId !== null;
  }

  async loadUserDetails(userId: number): Promise<void> {
    this.selectedUserId = userId;
    this.selectedUser = null;
    this.isUserDetailsLoading = true;
    this.userDetailsError = null;

    try {
      const user = await getUser(userId);

      runInAction(() => {
        if (this.selectedUserId !== userId) {
          return;
        }

        this.selectedUser = user;
      });
    } catch (error) {
      runInAction(() => {
        if (this.selectedUserId !== userId) {
          return;
        }

        this.userDetailsError =
          error instanceof Error
            ? error.message
            : "Не удалось загрузить пользователя";
      });
    } finally {
      runInAction(() => {
        if (this.selectedUserId !== userId) {
          return;
        }

        this.isUserDetailsLoading = false;
      });
    }
  }

  clearUserDetails(): void {
    this.selectedUser = null;
    this.selectedUserId = null;
    this.userDetailsError = null;
    this.isUserDetailsLoading = false;
  }

  retryUserDetails(): void {
    if (this.selectedUserId === null) {
      return;
    }

    void this.loadUserDetails(this.selectedUserId);
  }
}
