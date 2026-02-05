'use client';

import React from 'react';
import { useGetCategoriesViewModel } from '../../hooks/useCategoryListViewModel';
import { useDeleteCategoryViewModel } from '../../hooks/useDeleteCategoryViewModel';
import { Category } from '../../../domain/entities/Category';
import { CategoryCard } from '../molecules/CategoryCard';
import { Pagination } from '@/src/shared/components/ui';

interface AdminCategoryListProps {
  onEdit?: (category: Category) => void;
  initialCategories: Category[];
  initialPagination: Pagination;
}

export const AdminCategoryList: React.FC<AdminCategoryListProps> = ({ onEdit, initialCategories, initialPagination }) => {
  const listViewModel = useGetCategoriesViewModel(initialCategories);
  const deleteViewModel = useDeleteCategoryViewModel();
  const { categories, loading, error } = listViewModel.getState();

  const handleDelete = async (category: Category) => {
    if (!confirm(`Supprimer la catégorie "${category.name}" ?`)) return;
    
    const success = await deleteViewModel.deleteCategory(category.id);
    if (success) {
      listViewModel.loadCategories();
    } else {
      const deleteError = deleteViewModel.getState().error;
      if (deleteError) alert(deleteError);
    }
  };

  if (loading && categories.length === 0) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600 py-8">{error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-8 text-gray-500">Aucune catégorie trouvée</div>
      )}
    </div>
  );
};
