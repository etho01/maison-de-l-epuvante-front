'use client';

import React from 'react';
import { useProductsViewModel } from '../hooks/useProductsViewModel';
import { useCategoriesViewModel } from '../hooks/useCategoriesViewModel';
import { ProductList } from './ProductList';
import { ProductFilters } from './ProductFilters';
import { Product } from '../../domain/entities/Product';
import { Pagination } from '@/src/shared/domain/Pagination';

interface ProductCatalogProps {
  initialProducts: Product[];
  initialProductPagination: Pagination;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ initialProducts, initialProductPagination }) => {
  const productsVM = useProductsViewModel(initialProducts, initialProductPagination);
  const categoriesVM = useCategoriesViewModel();
  
  const { products, loading, error, filters } = productsVM.getState();
  const { categories } = categoriesVM.getState();

  return (
    <div className="flex gap-8">
      <ProductFilters
        categories={categories}
        selectedCategoryId={filters['category.id']}
        selectedType={filters.type}
        onCategoryChange={(categoryId) => productsVM.setCategoryFilter(categoryId)}
        onTypeChange={(type) => productsVM.setTypeFilter(type)}
      />

      <main className="flex-1">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <ProductList products={products} loading={loading} />
      </main>
    </div>
  );
};
