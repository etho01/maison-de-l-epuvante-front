/**
 * Component: PriceDisplay
 * Atom - Affichage du prix d'un produit - Style professionnel
 */

import React from 'react';

interface PriceDisplayProps {
  price: string | number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'emphasis' | 'muted';
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  currency = '€',
  size = 'md',
  variant = 'default',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const variantStyles = {
    default: 'text-neutral-100 font-semibold',
    emphasis: 'text-crimson-400 font-bold',
    muted: 'text-neutral-500 font-medium',
  };

  return (
    <span className={`${sizeStyles[size]} ${variantStyles[variant]} tabular-nums ${className}`}>
      {price} {currency}
    </span>
  );
};
