/**
 * Component: QuantitySelector
 * Atom - Sélecteur de quantité avec boutons +/-
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
      button: 'px-2 py-0.5 text-sm',
      display: 'px-2 text-sm',
    },
    md: {
      button: 'px-2 py-1 text-base',
      display: 'px-3 text-base',
    },
    lg: {
      button: 'px-3 py-2 text-lg',
      display: 'px-4 text-lg',
    },
  };

  const canDecrease = quantity > min && !disabled;
  const canIncrease = quantity < max && !disabled;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={onDecrease}
        disabled={!canDecrease}
        className={`${sizeStyles[size].button} border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
        aria-label="Diminuer la quantité"
      >
        -
      </button>
      <span className={`${sizeStyles[size].display} font-medium`}>
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={!canIncrease}
        className={`${sizeStyles[size].button} border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
        aria-label="Augmenter la quantité"
      >
        +
      </button>
    </div>
  );
};
