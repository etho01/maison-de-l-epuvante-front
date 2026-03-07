/**
 * Component: StockIndicator
 * Atom - Indicateur de disponibilité du stock - Style professionnel
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

  const getStatusConfig = () => {
    if (!isInStock) {
      return {
        color: 'text-crimson-400',
        bgColor: 'bg-crimson-950/30',
        icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>,
      };
    }
    if (isLowStock) {
      return {
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-950/30',
        icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>,
      };
    }
    return {
      color: 'text-green-400',
      bgColor: 'bg-green-950/30',
      icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>,
    };
  };

  const status = getStatusConfig();
  const message = isInStock
    ? showQuantity
      ? `En stock (${stock})`
      : 'En stock'
    : 'Rupture de stock';

  return (
    <span className={`inline-flex items-center gap-1.5 ${sizeStyles[size]} ${status.color} ${status.bgColor} px-2.5 py-1 rounded-lg font-medium ${className}`}>
      {status.icon}
      {message}
    </span>
  );
};
