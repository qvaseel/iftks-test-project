import { UsersTableStore } from "@/entities/user";

export class RootStore {
  usersTableStore: UsersTableStore;

  constructor() {
    this.usersTableStore = new UsersTableStore();
  }
}
