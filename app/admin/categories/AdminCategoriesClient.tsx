'use client';

import React, { useState } from 'react';
import { AdminCategoryList } from '@/src/ecommerce/presentation/components/organisms/AdminCategoryList';
import { AdminCategoryForm } from '@/src/ecommerce/presentation/components/organisms/AdminCategoryForm';
import { Category } from '@/src/ecommerce/domain/entities/Category';
import { Pagination } from '@/src/shared/domain/Pagination';

interface AdminCategoriesClientProps {
  allCategories: Category[];
  initialCategories: Category[];
  initialPagination: Pagination;
}

export default function AdminCategoriesClient({
  allCategories,
  initialCategories,
  initialPagination,
}: AdminCategoriesClientProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingCategory(undefined);
    window.location.reload();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Catégories</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Nouvelle catégorie
        </button>
      </div>

      {showForm ? (
        <AdminCategoryForm
          allCategories={allCategories}
          category={editingCategory}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <AdminCategoryList 
          onEdit={handleEdit} 
          initialCategories={initialCategories} 
          initialPagination={initialPagination} 
        />
      )}
    </div>
  );
}
