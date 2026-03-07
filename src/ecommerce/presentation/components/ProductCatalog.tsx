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
  
  const { products, loading, filters } = productsVM.getState();

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
        <ProductList products={products} loading={loading} />
        <PaginationComponent
          pagination={initialProductPagination} 
          onPageChange={(page) => productsVM.setFilter('page', page)} 
        />
      </main>
    </div>
  );
};
