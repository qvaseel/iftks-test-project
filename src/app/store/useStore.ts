import { useContext } from "react";
import { StoreContext } from "./StoreContext";

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore должен использоваться внутри StoreProvider");
  }
  return store;
}
