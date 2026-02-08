/**
 * Component: Select
 * Composant réutilisable pour les champs de sélection
 */

import { forwardRef, SelectHTMLAttributes } from 'react';

export type SelectVariant = 'default' | 'dark' | 'light';
export type SelectSize = 'sm' | 'md' | 'lg';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  variant?: SelectVariant;
  selectSize?: SelectSize;
  options?: Array<{ value: string; label: string }>;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, variant = 'dark', selectSize = 'md', className = '', options, children, ...props }, ref) => {
    const variantStyles: Record<SelectVariant, string> = {
      default: 'bg-white border-gray-300 text-gray-900',
      dark: 'bg-gray-900 border-gray-700 text-white',
      light: 'bg-gray-50 border-gray-300 text-gray-900',
    };

    const sizeStyles: Record<SelectSize, string> = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    const labelColorClass = variant === 'dark' ? 'text-gray-300' : 'text-gray-700';

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className={`block ${labelColorClass} mb-2 text-sm font-medium`}
          >
            {label}
          </label>
        )}
        <select
          id={id}
          ref={ref}
          className={`w-full border ${
            error ? 'border-red-500' : variantStyles[variant]
          } ${sizeStyles[selectSize]} rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors ${className}`}
          {...props}
        >
          {options ? (
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            children
          )}
        </select>
        {error && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <span>⚠️</span>
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
