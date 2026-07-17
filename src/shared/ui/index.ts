import { lazy, type ComponentType } from "react";
import { withSuspense } from "./withSuspense.tsx";
export { withSuspense };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lazyLoad = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
) => withSuspense(lazy(factory));

export type { SelectOption } from "./select.tsx";

export const Button = lazyLoad(() =>
  import("./button.tsx").then((m) => ({ default: m.Button })),
);
export const ErrorMessage = lazyLoad(() =>
  import("./error-message.tsx").then((m) => ({ default: m.ErrorMessage })),
);
export const Spinner = lazyLoad(() =>
  import("./spinner.tsx").then((m) => ({ default: m.Spinner })),
);
export const Pagination = lazyLoad(() =>
  import("./pagination.tsx").then((m) => ({ default: m.Pagination })),
);
export const Input = lazyLoad(() =>
  import("./input.tsx").then((m) => ({ default: m.Input })),
);
export const Select = lazyLoad(() =>
  import("./select.tsx").then((m) => ({ default: m.Select })),
);
export const Modal = lazyLoad(() =>
  import("./modal.tsx").then((m) => ({ default: m.Modal })),
);
