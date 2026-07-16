import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/store";
import { UserTableWidget } from "@/widgets/user/table";

export const UserTablePage = observer(() => {
  const { usersTableStore } = useStore();

  useEffect(() => {
    void usersTableStore.loadUsers();
  }, [usersTableStore]);

  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Пользователи</h1>
      <UserTableWidget />
    </section>
  );
});
