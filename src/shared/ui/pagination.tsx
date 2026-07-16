import { Button } from "@/shared/ui/button";

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
  if (totalPages <= 1) {
    return null;
  }

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2"
      aria-label="Пагинация"
    >
      <Button
        variant="secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Назад
      </Button>

      {startPage > 1 && (
        <>
          <Button variant="secondary" onClick={() => onPageChange(1)}>
            1
          </Button>

          {startPage > 2 && <span className="px-1 text-slate-500">…</span>}
        </>
      )}

      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <Button
            key={page}
            variant={isActive ? "primary" : "secondary"}
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
            <span className="px-1 text-slate-500">…</span>
          )}

          <Button variant="secondary" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="secondary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Вперёд
      </Button>
    </nav>
  );
}
