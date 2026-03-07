/**
 * Component: QuantitySelector
 * Atom - Sélecteur de quantité avec boutons +/- - Style professionnel
 */

'use client';

import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  min?: number;
  max?: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  min = 1,
  max = Infinity,
  onIncrease,
  onDecrease,
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const sizeStyles = {
    sm: {
      button: 'w-7 h-7 text-sm',
      display: 'px-3 text-sm min-w-[2.5rem]',
    },
    md: {
      button: 'w-9 h-9 text-base',
      display: 'px-4 text-base min-w-[3rem]',
    },
    lg: {
      button: 'w-11 h-11 text-lg',
      display: 'px-5 text-lg min-w-[3.5rem]',
    },
  };

  const canDecrease = quantity > min && !disabled;
  const canIncrease = quantity < max && !disabled;

  return (
    <div className={`inline-flex items-center gap-1 glass-effect rounded-xl p-1 ${className}`}>
      <button
        onClick={onDecrease}
        disabled={!canDecrease}
        className={`${sizeStyles[size].button} flex items-center justify-center border border-crimson-900/30 rounded-lg hover:bg-crimson-950/50 hover:border-crimson-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-neutral-300 hover:text-crimson-400 font-bold`}
        aria-label="Diminuer la quantité"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <span className={`${sizeStyles[size].display} font-semibold text-neutral-100 text-center tabular-nums`}>
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={!canIncrease}
        className={`${sizeStyles[size].button} flex items-center justify-center border border-crimson-900/30 rounded-lg hover:bg-crimson-950/50 hover:border-crimson-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-neutral-300 hover:text-crimson-400 font-bold`}
        aria-label="Augmenter la quantité"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};
