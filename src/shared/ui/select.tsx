import { forwardRef, type SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ options, placeholder, className = "", ...props }, ref) {
    return (
      <select
        ref={ref}
        className={`
        h-9 w-full
        rounded-md border border-slate-300
        bg-white px-3
        text-sm text-slate-900
        outline-none transition-colors
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
      >
        {placeholder && <option value="">{placeholder}</option>}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  },
);
