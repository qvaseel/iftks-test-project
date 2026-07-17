import { UsersTableStore } from "@/entities/user";
import { UserModalStore } from "@/features/user/view";

export class RootStore {
  usersTableStore: UsersTableStore;
  userModalStore: UserModalStore;

  constructor() {
    this.usersTableStore = new UsersTableStore();
    this.userModalStore = new UserModalStore();
  }
}
