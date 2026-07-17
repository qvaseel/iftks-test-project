import { useTranslation } from "react-i18next";
import { UserDetails } from "@/entities/user";
import { Button, ErrorMessage, Modal, Spinner } from "@/shared/ui";
import type { UserDetailsModalProps } from "../model";

export function UserDetailsModal({
  isOpen,
  user,
  isLoading,
  error,
  onClose,
  onRetry,
}: UserDetailsModalProps) {
  const { t } = useTranslation("user");

  const title = user
    ? `${user.firstName} ${user.lastName}`
    : t("users.details.title");

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      closeLabel={t("users.details.close")}
      onClose={onClose}
      footer={
        <Button variant="secondary" onClick={onClose}>
          {t("users.details.close")}
        </Button>
      }
    >
      {isLoading && (
        <div className="flex min-h-64 items-center justify-center">
          <Spinner text={t("users.details.loading")} />
        </div>
      )}

      {!isLoading && error && (
        <div className="flex min-h-64 items-center justify-center">
          <ErrorMessage message={error} onRetry={onRetry} />
        </div>
      )}

      {!isLoading && !error && user && <UserDetails user={user} />}

      {!isLoading && !error && !user && (
        <p className="py-10 text-center text-sm text-slate-500">
          {t("users.details.empty")}
        </p>
      )}
    </Modal>
  );
}
