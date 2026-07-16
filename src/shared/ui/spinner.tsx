interface SpinnerProps {
  text?: string;
}

export function Spinner({ text = "Загрузка..." }: SpinnerProps) {
  return (
    <div
      className="
        flex min-h-40
        items-center justify-center
        gap-3
      "
      role="status"
      aria-live="polite"
    >
      <div
        className="
          h-8 w-8
          animate-spin
          rounded-full
          border-4 border-slate-300
          border-t-blue-600
        "
        aria-hidden="true"
      />

      <span className="text-sm text-slate-600">{text}</span>
    </div>
  );
}
