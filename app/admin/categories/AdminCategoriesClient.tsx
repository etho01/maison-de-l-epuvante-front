'use client';

import React, { useState } from 'react';
import { AdminEcommerceProvider } from '@/src/ecommerce/presentation/context/AdminEcommerceContext';
import { AdminCategoryList } from '@/src/ecommerce/presentation/components/organisms/AdminCategoryList';
import { AdminCategoryForm } from '@/src/ecommerce/presentation/components/organisms/AdminCategoryForm';
import { Category } from '@/src/ecommerce/domain/entities/Category';

export default function AdminCategoriesClient() {
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
    <AdminEcommerceProvider>
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
            category={editingCategory}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        ) : (
          <AdminCategoryList onEdit={handleEdit} />
        )}
      </div>
    </AdminEcommerceProvider>
  );
}
