'use client';

import React, { useState } from 'react';
import { AdminCategoryList } from '@/src/ecommerce/presentation/components/organisms/Category/Admin/AdminCategoryList';
import { AdminCategoryForm } from '@/src/ecommerce/presentation/components/organisms/Category/Admin/AdminCategoryForm';
import { Category } from '@/src/ecommerce/domain/entities/Category';
import { Pagination } from '@/src/shared/domain/Pagination';
import { Button } from '@/src/shared/components/atoms';

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
        <h1 className="text-3xl font-bold bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">Gestion des Catégories</h1>
        <Button
          onClick={() => setShowForm(true)}
          variant="primary"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nouvelle catégorie</span>
        </Button>
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
