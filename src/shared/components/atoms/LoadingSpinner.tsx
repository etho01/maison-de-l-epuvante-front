/**
 * Component: LoadingSpinner
 * Atom - Indicateur de chargement - Style professionnel
 */

import React from 'react';

export type SpinnerSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'white' | 'neutral';

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
  xs: 'w-4 h-4 border-2',
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-3',
  lg: 'w-14 h-14 border-4',
  xl: 'w-20 h-20 border-4',
};

const colorClasses: Record<SpinnerVariant, string> = {
  primary: 'border-crimson-900/30 border-t-crimson-500',
  white:   'border-white/30 border-t-white',
  neutral: 'border-neutral-700 border-t-neutral-400',
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
      {label && <p className="text-sm text-neutral-400 font-medium">{label}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center glass-effect">
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
  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl glass-effect">
    <LoadingSpinner size="md" label={label} />
  </div>
);

export default LoadingSpinner;
