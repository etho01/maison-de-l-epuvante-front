'use client';

import React from 'react';

interface ProductStockBadgeProps {
  stock: number;
}

export const ProductStockBadge: React.FC<ProductStockBadgeProps> = ({ stock }) => {
  const getStockStatus = () => {
    if (stock === 0) return { label: 'Rupture', color: 'bg-red-100 text-red-800' };
    if (stock < 10) return { label: 'Stock faible', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'En stock', color: 'bg-green-100 text-green-800' };
  };

  const status = getStockStatus();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
      {status.label} ({stock})
    </span>
  );
};
