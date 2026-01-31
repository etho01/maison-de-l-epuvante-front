'use client';

import React from 'react';
import { Product, ProductFilters } from '../../domain/entities/Product';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 animate-pulse">
            <div className="bg-gray-200 h-48 rounded mb-4"></div>
            <div className="bg-gray-200 h-6 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-8 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
