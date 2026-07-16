import { observer } from "mobx-react-lite";
import { useStore } from "@/app/store/useStore";
import { ErrorMessage, Pagination, Spinner } from "@/shared/ui";
import {
  USER_TABLE_COLUMNS,
  USER_TABLE_INITIAL_WIDTH,
  UserTableRow,
} from "@/entities/user";
import { UserSortingRow } from "@/features/user/sorting";

export const UserTableWidget = observer(() => {
  const { usersTableStore } = useStore();

  if (usersTableStore.isLoading && usersTableStore.users.length === 0) {
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
          flex min-h-40 items-center justify-center
          rounded-lg border border-slate-200
          bg-white p-6 text-slate-500
        "
      >
        Пользователи не найдены
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {usersTableStore.isLoading && (
        <p className="text-center text-sm text-slate-500" role="status">
          Загрузка страницы...
        </p>
      )}

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table
          className="w-full table-fixed border-collapse bg-white"
          style={{
            minWidth: USER_TABLE_INITIAL_WIDTH,
          }}
        >
          <colgroup>
            {USER_TABLE_COLUMNS.map((column) => (
              <col
                key={column.key}
                style={{
                  width: column.initialWidth,
                }}
              />
            ))}
          </colgroup>

          <thead>
            <UserSortingRow
              columns={USER_TABLE_COLUMNS}
              sortField={usersTableStore.sortField}
              sortOrder={usersTableStore.sortOrder}
              onSort={usersTableStore.setSorting}
            />
          </thead>

          <tbody>
            {usersTableStore.users.map((user) => (
              <UserTableRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={usersTableStore.page}
        totalPages={usersTableStore.totalPages}
        onPageChange={usersTableStore.setPage}
      />
    </div>
  );
});
