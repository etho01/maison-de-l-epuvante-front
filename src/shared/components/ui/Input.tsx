/**
 * Component: Input
 * Composant réutilisable pour les champs de formulaire
 */

import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-gray-300 mb-2 text-sm font-medium"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`w-full px-4 py-3 bg-gray-900 border ${
            error ? 'border-red-500' : 'border-red-700'
          } rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors ${className}`}
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
