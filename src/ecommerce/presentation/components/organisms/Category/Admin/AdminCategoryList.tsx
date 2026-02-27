'use client';

import React, { useState } from 'react';
import { useGetCategoriesViewModel, useDeleteCategoryViewModel } from '../../../../hooks/categories';
import { Category } from '../../../../../domain/entities/Category';
import { CategoryCard } from '../../../molecules/CategoryCard';
import { Pagination } from '@/src/shared/components/ui';
import { ConfirmModal } from '@/src/shared/components/molecules';
import { PaginationComponent } from '@/src/shared/components/molecules/Pagination';
import { ApiError } from '@/src/shared/domain/ApiError';

interface AdminCategoryListProps {
  onEdit?: (category: Category) => void;
  initialCategories: Category[];
  initialPagination: Pagination;
}

export const AdminCategoryList: React.FC<AdminCategoryListProps> = ({ onEdit, initialCategories, initialPagination }) => {
  const listViewModel = useGetCategoriesViewModel(initialCategories, initialPagination);
  const deleteViewModel = useDeleteCategoryViewModel();
  const { categories, loading } = listViewModel.getState();
  const { loading: deleteLoading } = deleteViewModel.getState();

  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
  };

  const handleConfirmDelete = () => {
    if (!categoryToDelete) return;

    setError(null);
    deleteViewModel.deleteCategory(categoryToDelete.id)
      .then(() => {
        setCategoryToDelete(null);
        listViewModel.loadCategories();
      })
      .catch((err: ApiError) => {
        setError(err.message || 'Erreur lors de la suppression de la catégorie');
      });
  };

  const handleCancelDelete = () => {
    setCategoryToDelete(null);
  };

  if (loading && categories.length === 0) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-5">
        {categories.map((category: Category) => (
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
