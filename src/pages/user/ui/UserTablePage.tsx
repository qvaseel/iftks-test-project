import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { UserTableWidget } from "@/widgets/user/table";
import { useTranslation } from "react-i18next";
import { useStore } from "@/shared/lib";

export const UserTablePage = observer(() => {
  const { usersTableStore } = useStore();
  const { t } = useTranslation("user");

  useEffect(() => {
    void usersTableStore.loadUsers();
  }, [usersTableStore]);

  return (
    <section className="w-full min-w-0">
      <h1 className="mb-4 text-xl font-bold text-slate-900 sm:mb-6 sm:text-2xl">
        {t("users.title")}
      </h1>
      <UserTableWidget />
    </section>
  );
});
