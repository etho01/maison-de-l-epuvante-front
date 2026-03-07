/**
 * Component: Select
 * Composant réutilisable pour les champs de sélection - Style professionnel
 */

import { forwardRef, SelectHTMLAttributes } from 'react';

export type SelectVariant = 'default' | 'ghost';
export type SelectSize = 'sm' | 'md' | 'lg';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  variant?: SelectVariant;
  selectSize?: SelectSize;
  options?: Array<{ value: string; label: string }>;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, variant = 'default', selectSize = 'md', className = '', options, children, ...props }, ref) => {
    const variantStyles: Record<SelectVariant, string> = {
      default: 'bg-neutral-900/50 border-crimson-900/30 text-neutral-100',
      ghost: 'bg-transparent border-neutral-700 text-neutral-100',
    };

    const sizeStyles: Record<SelectSize, string> = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-neutral-300 mb-2 text-sm font-medium"
          >
            {label}
          </label>
        )}
        <select
          id={id}
          ref={ref}
          className={`w-full border ${
            error ? 'border-crimson-500 focus:ring-crimson-500' : `${variantStyles[variant]} focus:ring-crimson-600 focus:border-crimson-600`
          } ${sizeStyles[selectSize]} rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 cursor-pointer ${className}`}
          {...props}
        >
          {options ? (
            options.map((option) => (
              <option key={option.value} value={option.value} className="bg-neutral-900 text-neutral-100">
                {option.label}
              </option>
            ))
          ) : (
            children
          )}
        </select>
        {error && (
          <p className="text-crimson-400 text-sm mt-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
