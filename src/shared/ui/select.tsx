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
          h-9 w-full min-w-0
          rounded-md
          border border-slate-300
          bg-white px-2
          text-xs text-slate-900
          outline-none
          transition-colors
          hover:border-slate-400
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
          disabled:cursor-not-allowed
          disabled:bg-slate-100
          sm:px-3 sm:text-sm
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
