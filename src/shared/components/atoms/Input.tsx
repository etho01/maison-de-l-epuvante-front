/**
 * Component: Input
 * Composant réutilisable pour les champs de formulaire - Style professionnel
 */

import { forwardRef, InputHTMLAttributes } from 'react';

export type InputVariant = 'default' | 'ghost';
export type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: InputVariant;
  inputSize?: InputSize;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, variant = 'default', inputSize = 'md', className = '', ...props }, ref) => {
    const variantStyles: Record<InputVariant, string> = {
      default: 'bg-neutral-900/50 border-crimson-900/30 text-neutral-100 placeholder-neutral-500',
      ghost: 'bg-transparent border-neutral-700 text-neutral-100 placeholder-neutral-600',
    };

    const sizeStyles: Record<InputSize, string> = {
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
        <input
          id={id}
          ref={ref}
          className={`w-full border ${
            error ? 'border-crimson-500 focus:ring-crimson-500' : `${variantStyles[variant]} focus:ring-crimson-600 focus:border-crimson-600`
          } ${sizeStyles[inputSize]} rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${className}`}
          {...props}
        />
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

Input.displayName = 'Input';

export default Input;
