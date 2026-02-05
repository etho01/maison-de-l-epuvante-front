'use client';

import React, { useState, useEffect } from 'react';
import { useCreateCategoryViewModel } from '../../hooks/useCreateCategoryViewModel';
import { useUpdateCategoryViewModel } from '../../hooks/useUpdateCategoryViewModel';
import { useGetAllCategoriesViewModel } from '../../hooks/useGetAllCategoriesViewModel';
import { Category, CreateCategoryData, UpdateCategoryData } from '../../../domain/entities/Category';

interface AdminCategoryFormProps {
  category?: Category;
  onSuccess?: () => void;
  onCancel?: () => void;
  allCategories: Category[]; // Nécessaire pour la sélection de la catégorie parente
}

export const AdminCategoryForm: React.FC<AdminCategoryFormProps> = ({ category, onSuccess, onCancel, allCategories }) => {
  const createViewModel = useCreateCategoryViewModel();
  const updateViewModel = useUpdateCategoryViewModel();
  const allCategoriesViewModel = useGetAllCategoriesViewModel();
  const { loading: createLoading, error: createError } = createViewModel.getState();
  const { loading: updateLoading, error: updateError } = updateViewModel.getState();
  
  const loading = createLoading || updateLoading;
  const error = createError || updateError;
  
  useEffect(() => {
    allCategoriesViewModel.loadCategories();
  }, []);
  
  // Exclure la catégorie courante si on est en modification (éviter boucle)
  const categories = allCategories.filter(c => !category || c.id !== category.id);
  
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
    slug: category?.slug || '',
    parent: category?.parent?.id.toString() || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: CreateCategoryData | UpdateCategoryData = {
      name: formData.name,
      description: formData.description || undefined,
      slug: formData.slug,
      parent: formData.parent ? `/api/categories/${formData.parent}` : undefined,
    };

    const success = category
      ? await updateViewModel.updateCategory(category.id, data)
      : await createViewModel.createCategory(data as CreateCategoryData);
    
    if (success) {
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie parente</label>
        <select
          value={formData.parent}
          onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Aucune (catégorie racine)</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Enregistrement...' : category ? 'Mettre à jour' : 'Créer'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};
