import { Button } from "@/shared/ui/button";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="
        flex min-h-40
        flex-col items-center justify-center
        gap-4 rounded-lg
        border border-red-200
        bg-red-50 p-6
        text-center
      "
      role="alert"
    >
      <div>
        <h2 className="font-semibold text-red-800">Произошла ошибка</h2>

        <p className="mt-1 text-sm text-red-700">{message}</p>
      </div>

      {onRetry && <Button onClick={onRetry}>Повторить</Button>}
    </div>
  );
}
