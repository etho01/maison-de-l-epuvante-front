/**
 * Component: StockIndicator
 * Atom - Indicateur de disponibilité du stock
 */

import React from 'react';

interface StockIndicatorProps {
  stock: number;
  showQuantity?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StockIndicator: React.FC<StockIndicatorProps> = ({
  stock,
  showQuantity = true,
  size = 'sm',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const isInStock = stock > 0;
  const isLowStock = stock > 0 && stock <= 5;

  const colorClass = isInStock
    ? isLowStock
      ? 'text-orange-600'
      : 'text-green-600'
    : 'text-red-600';

  const message = isInStock
    ? showQuantity
      ? `En stock (${stock})`
      : 'En stock'
    : 'Rupture de stock';

  return (
    <span className={`${sizeStyles[size]} ${colorClass} font-medium ${className}`}>
      {message}
    </span>
  );
};
