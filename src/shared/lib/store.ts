import type { AppStore } from "@/app/lib";
import { createContext, useContext } from "react";

export const StoreContext = createContext<AppStore | null>(null);

export function useStore(): AppStore {
  const store = useContext(StoreContext);

  if (store === null) {
    throw new Error(
      "useStore должен использоваться внутри StoreContext.Provider",
    );
  }

  return store;
}
