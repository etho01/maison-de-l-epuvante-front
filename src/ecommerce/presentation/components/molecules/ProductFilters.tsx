'use client';

import React from 'react';
import { Category } from '../../domain/entities/Category';
import { ProductType } from '../../domain/entities/Product';
import { FilterSection, FilterOption } from '@/src/shared/components/molecules/FilterSection';

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
  const categoryOptions: FilterOption<number>[] = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const typeOptions: FilterOption<ProductType>[] = [
    { label: 'Produits physiques', value: 'physical' },
    { label: 'Produits numériques', value: 'digital' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 space-y-4">
      <FilterSection
        title="Catégories"
        options={categoryOptions}
        selectedValue={selectedCategoryId}
        onChange={onCategoryChange}
        clearLabel="Toutes"
      />

      <FilterSection
        title="Type de produit"
        options={typeOptions}
        selectedValue={selectedType}
        onChange={onTypeChange}
        clearLabel="Tous"
      />
    </aside>
  );
};
