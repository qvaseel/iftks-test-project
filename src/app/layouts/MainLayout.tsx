import { LanguageSwitcher } from "@/features/language-switcher";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-100">
      <div className="mx-auto w-full min-w-0 max-w-[1400px] px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
        <header className="mb-4 flex justify-end sm:mb-6">
          <LanguageSwitcher />
        </header>
        <Outlet />
      </div>
    </main>
  );
}
