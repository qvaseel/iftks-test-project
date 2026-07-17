import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { ColumnHandleResizeProps, ResizeState } from "../model";

export function ColumnHandleResize({
  label,
  currentWidth,
  initialWidth,
  minWidth,
  onResize,
}: ColumnHandleResizeProps) {
  const resizeState = useRef<ResizeState>({
    isResizing: false,
    startX: 0,
    startWidth: 0,
  });

  const [isResizing, setIsResizing] = useState(false);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    event.currentTarget.setPointerCapture(event.pointerId);

    resizeState.current = {
      isResizing: true,
      startX: event.clientX,
      startWidth: currentWidth,
    };

    setIsResizing(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!resizeState.current.isResizing) {
      return;
    }

    const difference = event.clientX - resizeState.current.startX;

    const nextWidth = Math.max(
      minWidth,
      resizeState.current.startWidth + difference,
    );

    onResize(nextWidth);
  };

  const finishResize = (event: PointerEvent<HTMLButtonElement>) => {
    if (!resizeState.current.isResizing) {
      return;
    }

    resizeState.current.isResizing = false;
    setIsResizing(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleDoubleClick = () => {
    onResize(initialWidth);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();

      onResize(Math.max(minWidth, currentWidth - 10));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();

      onResize(currentWidth + 10);
    }

    if (event.key === "Home") {
      event.preventDefault();

      onResize(initialWidth);
    }
  };

  return (
    <button
      type="button"
      className={`absolute right-0 top-0 z-10 h-full w-2 translate-x-1/2 cursor-col-resize touch-none select-none border-0 bg-transparent
         p-0 outline-none hover:bg-blue-400/40 focus-visible:bg-blue-400/40 ${isResizing ? "bg-blue-500/50" : ""}`}
      aria-label={label}
      title={label}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishResize}
      onPointerCancel={finishResize}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
    />
  );
}
