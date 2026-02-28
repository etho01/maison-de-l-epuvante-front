/**
 * Component: LoadingSpinner
 * Atom - Indicateur de chargement avec variantes de taille et de couleur.
 * Remplace les div "Chargement..." inline dispersés dans l'application.
 */

import React from 'react';

export type SpinnerSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'white' | 'gray';

export interface LoadingSpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  /** Texte affiché sous le spinner */
  label?: string;
  /** Occupe toute la page avec un fond semi-transparent */
  fullPage?: boolean;
  className?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  xs: 'w-3 h-3 border',
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-4',
  xl: 'w-16 h-16 border-4',
};

const colorClasses: Record<SpinnerVariant, string> = {
  primary: 'border-red-200 border-t-red-600',
  white:   'border-white/30 border-t-white',
  gray:    'border-gray-200 border-t-gray-600',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size    = 'md',
  variant = 'primary',
  label,
  fullPage = false,
  className = '',
}) => {
  const spinner = (
    <div
      role="status"
      aria-label={label ?? 'Chargement…'}
      className={`flex flex-col items-center gap-3 ${className}`}
    >
      <div
        className={[
          'rounded-full animate-spin',
          sizeClasses[size],
          colorClasses[variant],
        ].join(' ')}
      />
      {label && <p className="text-sm text-gray-500">{label}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
};

/**
 * Overlay de chargement positionné en absolu sur le conteneur parent (relatif).
 */
export const LoadingOverlay: React.FC<{ label?: string }> = ({ label }) => (
  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/70">
    <LoadingSpinner size="md" label={label} />
  </div>
);

export default LoadingSpinner;
