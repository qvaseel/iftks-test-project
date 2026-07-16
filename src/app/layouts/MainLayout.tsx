import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto w-full max-w-350">
        <Outlet />
      </div>
    </main>
  );
}
