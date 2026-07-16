import { Suspense, type ComponentType } from "react";

export function withSuspense<T extends object>(
  Component: ComponentType<T>,
  fallback?: React.ReactNode,
) {
  return (props: T) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
}
