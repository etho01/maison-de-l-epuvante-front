'use client';

import React from 'react';
import { Category } from '../../domain/entities/Category';
import { ProductType } from '../../domain/entities/Product';

interface ProductFiltersProps {
  categories: Category[];
  selectedCategoryId?: number;
  selectedType?: ProductType;
  onCategoryChange: (categoryId: number | undefined) => void;
  onTypeChange: (type: ProductType | undefined) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategoryId,
  selectedType,
  onCategoryChange,
  onTypeChange,
}) => {
  return (
    <aside className="w-64 flex-shrink-0">
      {/* Filtres par catégorie */}
      <div className="border rounded-lg p-4 mb-4">
        <h3 className="font-bold mb-3">Catégories</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange(undefined)}
            className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
              !selectedCategoryId ? 'bg-red-100 text-red-800' : ''
            }`}
          >
            Toutes
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                selectedCategoryId === category.id ? 'bg-red-100 text-red-800' : ''
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filtres par type */}
      <div className="border rounded-lg p-4">
        <h3 className="font-bold mb-3">Type de produit</h3>
        <div className="space-y-2">
          <button
            onClick={() => onTypeChange(undefined)}
            className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
              !selectedType ? 'bg-red-100 text-red-800' : ''
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => onTypeChange('physical')}
            className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
              selectedType === 'physical' ? 'bg-red-100 text-red-800' : ''
            }`}
          >
            Produits physiques
          </button>
          <button
            onClick={() => onTypeChange('digital')}
            className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
              selectedType === 'digital' ? 'bg-red-100 text-red-800' : ''
            }`}
          >
            Produits numériques
          </button>
        </div>
      </div>
    </aside>
  );
};
