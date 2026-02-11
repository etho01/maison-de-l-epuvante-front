'use client';

import React, { useState } from 'react';
import { useGetCategoriesViewModel } from '../../hooks/useCategoryListViewModel';
import { useDeleteCategoryViewModel } from '../../hooks/useDeleteCategoryViewModel';
import { Category } from '../../../domain/entities/Category';
import { CategoryCard } from '../molecules/CategoryCard';
import { Pagination } from '@/src/shared/components/ui';
import { ConfirmModal } from '@/src/shared/components/molecules';
import { PaginationComponent } from '@/src/shared/components/molecules/Pagination';

interface AdminCategoryListProps {
  onEdit?: (category: Category) => void;
  initialCategories: Category[];
  initialPagination: Pagination;
}

export const AdminCategoryList: React.FC<AdminCategoryListProps> = ({ onEdit, initialCategories, initialPagination }) => {
  const listViewModel = useGetCategoriesViewModel(initialCategories, initialPagination);
  const deleteViewModel = useDeleteCategoryViewModel();
  const { categories, loading, error } = listViewModel.getState();
  const { loading: deleteLoading } = deleteViewModel.getState();

  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    const success = await deleteViewModel.deleteCategory(categoryToDelete.id);
    if (success) {
      setCategoryToDelete(null);
      listViewModel.loadCategories();
    } else {
      const deleteError = deleteViewModel.getState().error;
      if (deleteError) alert(deleteError);
    }
  };

  const handleCancelDelete = () => {
    setCategoryToDelete(null);
  };

  if (loading && categories.length === 0) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600 py-8">{error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-5">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={onEdit}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>
      <PaginationComponent
        pagination={initialPagination}
        onPageChange={(page: number) => listViewModel.setFilter({
          page
        })}
      />


      {categories.length === 0 && (
        <div className="text-center py-8 text-gray-500">Aucune catégorie trouvée</div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!categoryToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Supprimer la catégorie"
        message={`Êtes-vous sûr de vouloir supprimer la catégorie "${categoryToDelete?.name}" ? Cette action est irréversible et supprimera également toutes les sous-catégories associées.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="danger"
        isLoading={deleteLoading}
      />
    </div>
  );
};
