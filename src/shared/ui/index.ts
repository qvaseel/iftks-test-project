import { lazy, type ComponentType } from "react";
import { withSuspense } from "./withSuspense.tsx";
export { withSuspense };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lazyLoad = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
) => withSuspense(lazy(factory));

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
