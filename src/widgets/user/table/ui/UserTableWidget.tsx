import { observer } from "mobx-react-lite";
import { useStore } from "@/app/store";
import { UsersTableRow } from "@/entities/user";
import { ErrorMessage, Spinner } from "@/shared/ui";

export const UserTableWidget = observer(() => {
  const { usersTableStore } = useStore();

  if (usersTableStore.isLoading) {
    return <Spinner text="Загрузка пользователей..." />;
  }

  if (usersTableStore.error) {
    return (
      <ErrorMessage
        message={usersTableStore.error}
        onRetry={usersTableStore.retry}
      />
    );
  }

  if (usersTableStore.users.length === 0) {
    return (
      <div
        className="
          flex min-h-40
          items-center justify-center
          rounded-lg border
          border-slate-200 bg-white
          p-6 text-slate-500
        "
      >
        Пользователи не найдены
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full border-collapse bg-white">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-3 py-3 text-left">Фамилия</th>

            <th className="px-3 py-3 text-left">Имя</th>

            <th className="px-3 py-3 text-left">Отчество</th>

            <th className="px-3 py-3 text-left">Возраст</th>

            <th className="px-3 py-3 text-left">Пол</th>

            <th className="px-3 py-3 text-left">Телефон</th>

            <th className="px-3 py-3 text-left">Email</th>

            <th className="px-3 py-3 text-left">Страна</th>

            <th className="px-3 py-3 text-left">Город</th>
          </tr>
        </thead>

        <tbody>
          {usersTableStore.users.map((user) => (
            <UsersTableRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
});
