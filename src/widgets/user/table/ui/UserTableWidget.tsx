import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useStore } from "@/app/store/useStore";
import { ErrorMessage, Pagination, Spinner } from "@/shared/ui";
import {
  createInitialColumnWidths,
  getResizedColumnWidths,
  USER_TABLE_COLUMNS,
  USER_TABLE_WIDTH,
  UserTableRow,
  type UserTableColumnKey,
  type UserTableColumnWidths,
} from "@/entities/user";
import { UserSortingRow } from "@/features/user/sorting";
import { UserFilterRow } from "@/features/user/filter";
import { useCallback, useState } from "react";
import { UserDetailsModal } from "@/features/user/view";

export const UserTableWidget = observer(() => {
  const { t } = useTranslation("user");
  const { usersTableStore, userModalStore } = useStore();
  const isUserDetailsModalOpen = userModalStore.selectedUserId !== null;

  const [columnWidths, setColumnWidths] = useState<UserTableColumnWidths>(
    createInitialColumnWidths,
  );

  const handleColumnResize = useCallback(
    (columnKey: UserTableColumnKey, requestedWidth: number) => {
      setColumnWidths((currentWidths) =>
        getResizedColumnWidths({
          currentWidths,
          columnKey,
          requestedWidth,
        }),
      );
    },
    [],
  );

  if (
    usersTableStore.isLoading &&
    usersTableStore.users.length === 0 &&
    !usersTableStore.activeFilter
  ) {
    return <Spinner text={t("users.states.loading")} />;
  }

  const handleUserSelect = useCallback(
    (userId: number) => {
      void userModalStore.loadUserDetails(userId);
    },
    [userModalStore],
  );

  if (usersTableStore.error) {
    return (
      <ErrorMessage
        message={usersTableStore.error}
        onRetry={usersTableStore.retry}
      />
    );
  }

  return (
    <div className="w-full min-w-0 space-y-4">
      <p className="text-sm text-slate-500">
        {t("users.filters.singleFilterNotice")}
      </p>

      <div className="relative min-w-0 w-full">
        {usersTableStore.isLoading && (
          <div
            className="
        absolute inset-x-0 top-0 z-20
        flex justify-center
        bg-white/80 py-1
        text-sm text-slate-500
      "
            role="status"
          >
            {t("users.states.loading")}
          </div>
        )}

        <div className="min-w-0 w-full max-w-full overflow-x-auto rounded-lg border border-slate-200">
          <table
            className="table-fixed border-collapse bg-white"
            style={{
              width: USER_TABLE_WIDTH,
              minWidth: USER_TABLE_WIDTH,
              maxWidth: USER_TABLE_WIDTH,
            }}
          >
            <colgroup>
              {USER_TABLE_COLUMNS.map((column) => (
                <col
                  key={column.key}
                  style={{
                    width: columnWidths[column.key],
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
                onColumnResize={handleColumnResize}
                columnWidths={columnWidths}
              />

              <UserFilterRow
                columns={USER_TABLE_COLUMNS}
                activeFilter={usersTableStore.activeFilter}
                onFilterChange={usersTableStore.setFilter}
                onApplyFilter={usersTableStore.applyFilter}
              />
            </thead>

            <tbody>
              {usersTableStore.users.length > 0 ? (
                usersTableStore.users.map((user) => (
                  <UserTableRow
                    key={user.id}
                    user={user}
                    onSelect={handleUserSelect}
                  />
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
      </div>

      <Pagination
        currentPage={usersTableStore.page}
        totalPages={usersTableStore.totalPages}
        onPageChange={usersTableStore.setPage}
      />
      <UserDetailsModal
        isOpen={isUserDetailsModalOpen}
        user={userModalStore.selectedUser}
        isLoading={userModalStore.isUserDetailsLoading}
        error={userModalStore.userDetailsError}
        onClose={userModalStore.clearUserDetails}
        onRetry={userModalStore.retryUserDetails}
      />
    </div>
  );
});
