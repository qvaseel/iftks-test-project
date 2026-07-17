import type { DetailItemProps } from "../model";

export function DetailItem({ label, value }: DetailItemProps) {
  const displayedValue =
    value === null || value === undefined || value === "" ? "—" : value;

  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </dt>

      <dd className="mt-1 break-words text-sm text-slate-900">
        {displayedValue}
      </dd>
    </div>
  );
}
