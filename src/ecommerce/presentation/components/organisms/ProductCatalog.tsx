'use client';

import React from 'react';
import { ProductList } from './ProductList';
import { ProductFilters } from '../molecules/ProductFilters';
import { Pagination as PaginationType } from '@/src/shared/domain/Pagination';
import { Product } from '@/src/ecommerce/domain/entities/Product';
import { Category } from '@/src/ecommerce/domain/entities/Category';
import { useProductsViewModel } from '../../hooks/products';
import { PaginationComponent } from '@/src/shared/components/molecules/Pagination';

interface ProductCatalogProps {
  initialProducts: Product[];
  initialProductPagination: PaginationType;
  categories: Category[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ initialProducts, initialProductPagination, categories }) => {
  const productsVM = useProductsViewModel(initialProducts, initialProductPagination);
  
  const { products, loading, error, filters } = productsVM.getState();

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
        <PaginationComponent
          pagination={initialProductPagination} 
          onPageChange={(page: number) => productsVM.setFilter('page', page)} 
        />
      </main>
    </div>
  );
};
