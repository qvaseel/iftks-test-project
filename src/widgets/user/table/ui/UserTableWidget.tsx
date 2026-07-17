import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useStore } from "@/app/store/useStore";
import { ErrorMessage, Pagination, Spinner } from "@/shared/ui";
import {
  USER_TABLE_COLUMNS,
  USER_TABLE_INITIAL_WIDTH,
  UserTableRow,
} from "@/entities/user";
import { UserSortingRow } from "@/features/user/sorting";
import { UserFilterRow } from "@/features/user/filter";

export const UserTableWidget = observer(() => {
  const { t } = useTranslation("user");
  const { usersTableStore } = useStore();

  if (
    usersTableStore.isLoading &&
    usersTableStore.users.length === 0 &&
    !usersTableStore.activeFilter
  ) {
    return <Spinner text={t("users.states.loading")} />;
  }

  if (usersTableStore.error) {
    return (
      <ErrorMessage
        message={usersTableStore.error}
        onRetry={usersTableStore.retry}
      />
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        {t("users.filters.singleFilterNotice")}
      </p>

      {usersTableStore.isLoading && (
        <p className="text-center text-sm text-slate-500" role="status">
          {t("users.states.loading")}
        </p>
      )}

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table
          className="
            w-full table-fixed
            border-collapse bg-white
          "
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

            <UserFilterRow
              columns={USER_TABLE_COLUMNS}
              activeFilter={usersTableStore.activeFilter}
              onFilterChange={usersTableStore.setFilter}
            />
          </thead>

          <tbody>
            {usersTableStore.users.length > 0 ? (
              usersTableStore.users.map((user) => (
                <UserTableRow key={user.id} user={user} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={USER_TABLE_COLUMNS.length}
                  className="
                    px-4 py-10
                    text-center text-sm
                    text-slate-500
                  "
                >
                  {t("users.states.empty")}
                </td>
              </tr>
            )}
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
