import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RootStore, StoreContext } from "./store";
import { LocalizationLoader } from "@/shared/lib/i18n";
import "./index.css";
import App from "./App.tsx";

const rootStore = new RootStore();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext.Provider value={rootStore}>
      <Suspense>
        <LocalizationLoader />
        <App />
      </Suspense>
    </StoreContext.Provider>
  </StrictMode>,
);
