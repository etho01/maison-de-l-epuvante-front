/**
 * Component: PriceDisplay
 * Atom - Affichage du prix d'un produit
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
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const variantStyles = {
    default: 'text-gray-900',
    emphasis: 'text-red-600 font-bold',
    muted: 'text-gray-500',
  };

  return (
    <span className={`${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {price} {currency}
    </span>
  );
};
