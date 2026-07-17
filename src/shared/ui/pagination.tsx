import { Button } from "@/shared/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { t } = useTranslation("common");

  if (totalPages <= 1) {
    return null;
  }

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  const pages = Array.from(
    {
      length: endPage - startPage + 1,
    },
    (_, index) => startPage + index,
  );

  return (
    <nav
      className="
        flex w-full
        flex-wrap
        items-center justify-center
        gap-1.5
        sm:gap-2
      "
      aria-label={t("pagination.label")}
    >
      <Button
        variant="secondary"
        className="px-2 text-xs sm:px-3 sm:text-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <span className="sm:hidden">
          <ArrowLeft />
        </span>

        <span className="hidden sm:inline">{t("pagination.previous")}</span>
      </Button>

      {startPage > 1 && (
        <>
          <Button
            variant="secondary"
            className="min-w-9 px-2"
            onClick={() => onPageChange(1)}
          >
            1
          </Button>

          {startPage > 2 && <span className="px-1 text-slate-400">…</span>}
        </>
      )}

      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <Button
            key={page}
            variant={isActive ? "primary" : "secondary"}
            className="min-w-9 px-2"
            aria-current={isActive ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        );
      })}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-1 text-slate-400">…</span>
          )}

          <Button
            variant="secondary"
            className="min-w-9 px-2"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="secondary"
        className="px-2 text-xs sm:px-3 sm:text-sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span className="sm:hidden">
          <ArrowRight />
        </span>

        <span className="hidden sm:inline">{t("pagination.next")}</span>
      </Button>
    </nav>
  );
}
