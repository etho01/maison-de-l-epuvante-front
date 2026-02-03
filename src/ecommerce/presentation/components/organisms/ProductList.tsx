'use client';

import React from 'react';
import { ProductCard } from '../molecules/ProductCard';
import { LoaderCard } from '@/src/shared/components/atoms/LoaderCard';
import { Product } from '@/src/ecommerce/domain/entities/Product';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LoaderCard />
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
