/**
 * Component: Input
 * Composant réutilisable pour les champs de formulaire
 */

import { forwardRef, InputHTMLAttributes } from 'react';

export type InputVariant = 'default' | 'dark' | 'light';
export type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: InputVariant;
  inputSize?: InputSize;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, variant = 'dark', inputSize = 'md', className = '', ...props }, ref) => {
    const variantStyles: Record<InputVariant, string> = {
      default: 'bg-white border-gray-300 text-gray-900 placeholder-gray-400',
      dark: 'bg-gray-900 border-red-700 text-white placeholder-gray-500',
      light: 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400',
    };

    const sizeStyles: Record<InputSize, string> = {
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
        <input
          id={id}
          ref={ref}
          className={`w-full border ${
            error ? 'border-red-500' : variantStyles[variant]
          } ${sizeStyles[inputSize]} rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors ${className}`}
          {...props}
        />
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

Input.displayName = 'Input';

export default Input;
