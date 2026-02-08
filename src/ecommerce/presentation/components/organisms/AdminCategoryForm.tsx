'use client';

import React, { useState } from 'react';
import { useCreateCategoryViewModel } from '../../hooks/useCreateCategoryViewModel';
import { useUpdateCategoryViewModel } from '../../hooks/useUpdateCategoryViewModel';
import { Category, CreateCategoryData, UpdateCategoryData } from '../../../domain/entities/Category';
import { Input, Select, TextArea, Button, ErrorMessage } from '@/src/shared/components/atoms';
import { FormSection, FormActions } from '@/src/shared/components/molecules';

interface AdminCategoryFormProps {
  category?: Category;
  onSuccess?: () => void;
  onCancel?: () => void;
  allCategories: Category[]; // Nécessaire pour la sélection de la catégorie parente
}

export const AdminCategoryForm: React.FC<AdminCategoryFormProps> = ({ category, onSuccess, onCancel, allCategories }) => {
  const createViewModel = useCreateCategoryViewModel();
  const updateViewModel = useUpdateCategoryViewModel();
  const { loading: createLoading, error: createError } = createViewModel.getState();
  const { loading: updateLoading, error: updateError } = updateViewModel.getState();
  
  const loading = createLoading || updateLoading;
  const error = createError || updateError;
  
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
    <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-700 text-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-red-500">
        {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
      </h2>

      <ErrorMessage message={error} />

      <FormSection title="Informations générales">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom *"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            variant="dark"
          />

          <Input
            label="Slug *"
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            variant="dark"
          />
        </div>

        <Select
          label="Catégorie parente"
          value={formData.parent}
          onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
          variant="dark"
        >
          <option value="">Aucune (catégorie racine)</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>

        <TextArea
          label="Description"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          variant="dark"
        />
      </FormSection>

      <FormActions align="left">
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
        >
          {loading ? 'Enregistrement...' : category ? 'Mettre à jour' : 'Créer'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            variant="secondary"
          >
            Annuler
          </Button>
        )}
      </FormActions>
    </form>
  );
};
