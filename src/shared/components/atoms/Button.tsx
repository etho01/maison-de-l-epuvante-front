/**
 * Component: Button
 * Composant réutilisable pour les boutons - Style professionnel
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:cursor-not-allowed disabled:opacity-50';
  
  const variants = {
    primary: 'bg-crimson-600 hover:bg-crimson-500 text-white shadow-crimson-sm hover:shadow-crimson-md hover:scale-105 focus:ring-crimson-600',
    secondary: 'bg-neutral-800 hover:bg-neutral-700 text-white shadow-md hover:shadow-lg hover:scale-105 focus:ring-neutral-600',
    danger: 'bg-crimson-800 hover:bg-crimson-700 text-crimson-100 shadow-crimson-sm hover:shadow-crimson-md hover:scale-105 focus:ring-crimson-700',
    ghost: 'bg-transparent hover:bg-crimson-950/30 text-crimson-400 hover:text-crimson-300 focus:ring-crimson-600',
    outline: 'bg-transparent border-2 border-crimson-700 hover:border-crimson-500 hover:bg-crimson-950/40 text-neutral-200 hover:text-white focus:ring-crimson-600',
  };

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`cursor-pointer ${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Chargement...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
