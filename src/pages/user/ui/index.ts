import { lazy } from "react";
import { withSuspense } from "@/shared/ui";

export const UserTablePage = withSuspense(
  lazy(() =>
    import("./UserTablePage").then((module) => ({
      default: module.UserTablePage,
    })),
  ),
);
