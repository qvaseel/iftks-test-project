import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RootStore, StoreContext } from "./store";
import "./index.css";
import App from "./App.tsx";

const rootStore = new RootStore();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext.Provider value={rootStore}>
      <App />
    </StoreContext.Provider>
  </StrictMode>,
);
