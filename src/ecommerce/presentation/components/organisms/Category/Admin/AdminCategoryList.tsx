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
        <div className="mb-4 p-4 glass-effect border border-crimson-700/50 bg-crimson-950/30 text-crimson-400 rounded-xl flex items-start gap-3">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">{error}</div>
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
        <div className="text-center py-8 text-neutral-400">Aucune catégorie trouvée</div>
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
