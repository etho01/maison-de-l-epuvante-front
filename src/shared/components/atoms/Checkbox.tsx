/**
 * Component: Checkbox
 * Composant réutilisable pour les cases à cocher
 */

import { forwardRef, InputHTMLAttributes } from 'react';

export type CheckboxVariant = 'default' | 'dark' | 'light';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  variant?: CheckboxVariant;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, variant = 'dark', className = '', ...props }, ref) => {
    const labelColorClass = variant === 'dark' ? 'text-gray-300' : 'text-gray-700';

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={id}
            ref={ref}
            type="checkbox"
            className={`w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2 ${className}`}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-3">
            <label htmlFor={id} className={`text-sm font-medium ${labelColorClass}`}>
              {label}
            </label>
            {error && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span>⚠️</span>
                <span>{error}</span>
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
