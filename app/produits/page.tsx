import React from 'react';
import { ProductCatalog } from '@/src/ecommerce/presentation/components/ProductCatalog';

export default function ProduitsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Produits</h1>
      <ProductCatalog />
    </div>
  );
}
