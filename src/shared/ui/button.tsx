import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-slate-200 text-slate-900 hover:bg-slate-300";

  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center
        rounded-md px-4 py-2
        text-sm font-medium
        transition-colors
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variantClasses}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
