'use client';

import React, { useEffect, useState } from 'react';
import { useEcommerce } from '@/src/ecommerce/presentation/context/EcommerceContext';
import { ProductList } from '@/src/ecommerce/presentation/components/ProductList';
import { Product, ProductFilters } from '@/src/ecommerce/domain/entities/Product';
import { Category } from '@/src/ecommerce/domain/entities/Category';

export default function ProduitsPage() {
  const { getProducts, getCategories } = useEcommerce();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [productsData, categoriesData] = await Promise.all([
        getProducts(filters),
        getCategories(),
      ]);

      setProducts(productsData['hydra:member']);
      setCategories(categoriesData);
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Boutique</h1>

      <div className="flex gap-8">
        {/* Filtres */}
        <aside className="w-64 flex-shrink-0">
          <div className="border rounded-lg p-4 mb-4">
            <h3 className="font-bold mb-3">Catégories</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleCategoryFilter(undefined)}
                className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                  !filters['category.id'] ? 'bg-red-100 text-red-800' : ''
                }`}
              >
                Toutes
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryFilter(category.id)}
                  className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                    filters['category.id'] === category.id ? 'bg-red-100 text-red-800' : ''
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-3">Type de produit</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleTypeFilter(undefined)}
                className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                  !filters.type ? 'bg-red-100 text-red-800' : ''
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => handleTypeFilter('physical')}
                className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                  filters.type === 'physical' ? 'bg-red-100 text-red-800' : ''
                }`}
              >
                Produits physiques
              </button>
              <button
                onClick={() => handleTypeFilter('digital')}
                className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                  filters.type === 'digital' ? 'bg-red-100 text-red-800' : ''
                }`}
              >
                Produits numériques
              </button>
            </div>
          </div>
        </aside>

        {/* Liste des produits */}
        <main className="flex-1">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <ProductList products={products} loading={loading} />
        </main>
      </div>
    </div>
  );
}
