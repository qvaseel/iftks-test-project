import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserTablePage } from "@/pages/user";
import { MainLayout } from "./layouts/MainLayout";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<UserTablePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
