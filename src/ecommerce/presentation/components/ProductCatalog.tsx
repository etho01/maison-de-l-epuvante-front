'use client';

import React from 'react';
import { Product } from '../../domain/entities/Product';
import { Pagination } from '@/src/shared/domain/Pagination';
import { Category } from '../../domain/entities/Category';
import { PaginationComponent } from '@/src/shared/components/molecules/Pagination';
import { ProductList } from './organisms';
import { ProductFilters } from './molecules';
import { useGetProductsViewModel } from '../hooks';

interface ProductCatalogProps {
  initialProducts: Product[];
  initialProductPagination: Pagination;
  categories: Category[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ initialProducts, initialProductPagination, categories }) => {
  const productsVM = useGetProductsViewModel(initialProducts, initialProductPagination);
  
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
          <div className="glass-effect border border-crimson-700/50 bg-crimson-950/30 text-crimson-400 px-4 py-3 rounded-xl mb-4 flex items-start gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">{error}</div>
          </div>
        )}

        <ProductList products={products} loading={loading} />
        <PaginationComponent
          pagination={initialProductPagination} 
          onPageChange={(page) => productsVM.setFilter('page', page)} 
        />
      </main>
    </div>
  );
};
