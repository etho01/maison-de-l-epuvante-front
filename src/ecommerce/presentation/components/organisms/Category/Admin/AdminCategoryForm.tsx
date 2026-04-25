'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCategoryViewModel, useUpdateCategoryViewModel } from '../../../../hooks/categories';
import { Category, CreateCategoryData, UpdateCategoryData } from '../../../../../domain/entities/Category';
import { Input, Select, TextArea, Button, ErrorMessage } from '@/src/shared/components/atoms';
import { FormSection, FormActions } from '@/src/shared/components/molecules';
import { categorySchema, CategoryFormData } from '../../../../schemas/ecommerceSchemas';
import { ApiError } from '@/src/shared/domain/ApiError';
import { useRouter } from 'next/navigation';

interface AdminCategoryFormProps {
  category?: Category;
  onSuccess?: () => void;
  onCancel?: () => void;
  allCategories?: Category[]; // Nécessaire pour la sélection de la catégorie parente
}

export const AdminCategoryForm: React.FC<AdminCategoryFormProps> = ({ category, onSuccess, onCancel, allCategories = [] }) => {
  const createViewModel = useCreateCategoryViewModel();
  const updateViewModel = useUpdateCategoryViewModel();
  const { loading: createLoading } = createViewModel.getState();
  const { loading: updateLoading } = updateViewModel.getState();
  
  const loading = createLoading || updateLoading;
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const redirectToList = () => {
    router.push('/admin/categories');
  };
  
  // Exclure la catégorie courante si on est en modification (éviter boucle)
  const categories = allCategories.filter(c => !category || c.id !== category.id);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || '',
      description: category?.description || '',
      slug: category?.slug || '',
      parentId: category?.parent?.id.toString() || '',
    },
  });
  const onSubmit = (formData: CategoryFormData) => {
    setError(null);
    
    const data: CreateCategoryData | UpdateCategoryData = {
      name: formData.name,
      description: formData.description || undefined,
      slug: formData.slug,
      parentId: formData.parentId ? Number(formData.parentId) : undefined,
    };

    const promise = category
      ? updateViewModel.updateCategory(category.id, data)
      : createViewModel.createCategory(data as CreateCategoryData);

    promise
      .then(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          redirectToList();
        }
      })
      .catch((err: ApiError) => {
        setError(err.message || 'Erreur lors de l\'enregistrement de la catégorie');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-effect border border-crimson-900/30 text-neutral-100 p-6 rounded-xl shadow-crimson-md space-y-6">
      <h2 className="text-2xl font-bold mb-4 bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">
        {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
      </h2>

      <ErrorMessage message={error} />

      <FormSection title="Informations générales">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom *"
            type="text"
            error={errors.name?.message}
            variant="default"
            {...register('name')}
          />

          <Input
            label="Slug *"
            type="text"
            error={errors.slug?.message}
            variant="default"
            {...register('slug')}
          />
        </div>

        <Select
          label="Catégorie parente"
          error={errors.parentId?.message}
          variant="default"
          {...register('parentId')}
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
          error={errors.description?.message}
          variant="default"
          {...register('description')}
        />
      </FormSection>

      <FormActions align="left">
        <Button
          type="submit"
          disabled={loading || isSubmitting}
          variant="primary"
        >
          {loading || isSubmitting ? 'Enregistrement...' : category ? 'Mettre à jour' : 'Créer'}
        </Button>
        <Button
          type="button"
          onClick={onCancel || redirectToList}
          variant="secondary"
        >
          Annuler
        </Button>
      </FormActions>
    </form>
  );
};
