import { Button } from "@/shared/ui/button";
import { useTranslation } from "react-i18next";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { t } = useTranslation("common");

  return (
    <div
      className="
        rounded-lg border
        border-red-200
        bg-red-50 p-4
        text-center
      "
      role="alert"
    >
      <p className="text-sm text-red-700">{message}</p>

      {onRetry && (
        <Button className="mt-3" onClick={onRetry}>
          {t("actions.retry")}
        </Button>
      )}
    </div>
  );
}
