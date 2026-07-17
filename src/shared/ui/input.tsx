import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = "", type = "text", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={`
        h-9 w-full
        rounded-md border border-slate-300
        bg-white px-3
        text-sm text-slate-900
        outline-none transition-colors
        placeholder:text-slate-400
        hover:border-slate-400
        focus:border-blue-500
        focus:ring-2 focus:ring-blue-100
        disabled:cursor-not-allowed
        disabled:bg-slate-100
        disabled:text-slate-500
        aria-invalid:border-red-500
        aria-invalid:focus:ring-red-100
        ${className}
      `}
      {...props}
    />
  );
});
