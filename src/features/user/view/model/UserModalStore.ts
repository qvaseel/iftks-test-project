import { makeAutoObservable, runInAction } from "mobx";
import { getUser } from "../api";
import type { User, UserModalErrorKey } from "@/entities/user";

export class UserModalStore {
  selectedUser: User | null = null;
  selectedUserId: number | null = null;
  isUserDetailsLoading = false;
  userDetailsError: UserModalErrorKey | null = null;

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
    } catch {
      runInAction(() => {
        if (this.selectedUserId !== userId) {
          return;
        }

        this.userDetailsError = "users.errors.loadDetails";
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
