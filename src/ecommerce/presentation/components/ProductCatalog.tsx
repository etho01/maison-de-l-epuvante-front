'use client';

import React, { useEffect, useState } from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import { Product, ProductFilters as ProductFiltersType } from '../../domain/entities/Product';
import { Category } from '../../domain/entities/Category';
import { ProductList } from './ProductList';
import { ProductFilters } from './ProductFilters';

export const ProductCatalog: React.FC = () => {
  const { getProducts, getCategories } = useEcommerce();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFiltersType>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (err: any) {
      console.error('Erreur lors du chargement des catégories:', err);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const productsData = await getProducts(filters);
      setProducts(productsData['hydra:member']);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (categoryId: number | undefined) => {
    setFilters((prev) => ({
      ...prev,
      'category.id': categoryId,
    }));
  };

  const handleTypeFilter = (type: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      type: type as any,
    }));
  };

  return (
    <div className="flex gap-8">
      <ProductFilters
        categories={categories}
        selectedCategoryId={filters['category.id']}
        selectedType={filters.type}
        onCategoryChange={handleCategoryFilter}
        onTypeChange={handleTypeFilter}
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
