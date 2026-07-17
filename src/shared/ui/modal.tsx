import {
  useEffect,
  useId,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  closeLabel?: string;
  closeOnBackdrop?: boolean;
}

export function Modal({
  isOpen,
  title,
  children,
  onClose,
  footer,
  closeLabel = "Закрыть",
  closeOnBackdrop = true,
}: ModalProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener("keydown", handleKeyDown);

      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!closeOnBackdrop) {
      return;
    }

    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="
        fixed inset-0 z-50
        flex items-end justify-center
        bg-slate-950/50
        sm:items-center sm:p-4
      "
      onMouseDown={handleBackdropClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="
            flex
            max-h-[92dvh]
            w-full
            flex-col
            overflow-hidden
            rounded-t-2xl
            bg-white
            shadow-2xl

            sm:max-h-[calc(100dvh-2rem)]
            sm:max-w-2xl
            sm:rounded-xl
          "
      >
        <header
          className="
            flex shrink-0
            items-center justify-between
            gap-3
            border-b border-slate-200
            px-4 py-3
            sm:gap-4
            sm:px-5 sm:py-4
          "
        >
          <h2
            id={titleId}
            className="
                min-w-0 truncate
                text-lg font-semibold
                text-slate-900
                sm:text-xl
            "
          >
            {title}
          </h2>

          <button
            ref={closeButtonRef}
            type="button"
            className="
              flex h-9 w-9
              shrink-0 items-center justify-center
              rounded-md
              text-2xl leading-none
              text-slate-500
              transition-colors
              hover:bg-slate-100
              hover:text-slate-900
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
            "
            aria-label={closeLabel}
            title={closeLabel}
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div
          className="
            min-h-0 flex-1
            overflow-y-auto
            overscroll-y-contain
            px-4 py-4
            sm:px-5
          "
        >
          {children}
        </div>

        {footer && (
          <footer
            className="
                flex shrink-0
                items-center justify-end
                gap-2
                border-t border-slate-200
                px-4 py-3
                sm:gap-3
                sm:px-5 sm:py-4
            "
          >
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body,
  );
}
