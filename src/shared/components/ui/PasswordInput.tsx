/**
 * Component: PasswordInput
 * Composant réutilisable pour les champs mot de passe avec toggle visibilité
 */

import { forwardRef, InputHTMLAttributes, useState } from 'react';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

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
        <div className="relative">
          <input
            id={id}
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            className={`w-full px-4 py-3 bg-gray-900 border ${
              error ? 'border-red-500' : 'border-red-700'
            } rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors pr-12 ${className}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
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

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
