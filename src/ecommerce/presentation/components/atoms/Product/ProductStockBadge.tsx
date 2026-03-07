'use client';

import React from 'react';

interface ProductStockBadgeProps {
  stock: number;
}

export const ProductStockBadge: React.FC<ProductStockBadgeProps> = ({ stock }) => {
  const getStockStatus = () => {
    if (stock === 0) return { label: 'Rupture', color: 'bg-crimson-950/50 text-crimson-300 border border-crimson-700/50' };
    if (stock < 10) return { label: 'Stock faible', color: 'bg-yellow-950/50 text-yellow-300 border border-yellow-700/50' };
    return { label: 'En stock', color: 'bg-green-950/50 text-green-300 border border-green-700/50' };
  };

  if (stock == -1)
  {
    return ;
  }

  const status = getStockStatus();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
      {status.label} ({stock})
    </span>
  );
};
