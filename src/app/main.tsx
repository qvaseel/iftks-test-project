import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { rootStore } from "./lib/index.ts";
import "./index.css";
import App from "./App.tsx";
import { LocalizationLoader, StoreContext } from "@/shared/lib";

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
