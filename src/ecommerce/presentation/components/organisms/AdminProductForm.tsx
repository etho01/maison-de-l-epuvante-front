'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProductViewModel, useUpdateProductViewModel } from '../../hooks/products';
import { useGetAllCategoriesViewModel } from '../../hooks/categories';
import { Product, CreateProductData, UpdateProductData } from '../../../domain/entities/Product';
import { Category } from '../../../domain/entities/Category';
import { Input, Select, TextArea, Button, Checkbox, ErrorMessage } from '@/src/shared/components/atoms';
import { FormSection, FormActions } from '@/src/shared/components/molecules';
import { productSchema, ProductFormData } from '../../schemas/ecommerceSchemas';

interface AdminProductFormProps {
  product?: Product;
  onSuccess?: () => void;
  onCancel?: () => void;
  allCategories?: Category[]; // Nécessaire pour la sélection de la catégorie
}

export const AdminProductForm: React.FC<AdminProductFormProps> = ({ product, onSuccess, onCancel, allCategories }) => {
  const createViewModel = useCreateProductViewModel();
  const updateViewModel = useUpdateProductViewModel();
  const { loading: createLoading, error: createError } = createViewModel.getState();
  const { loading: updateLoading, error: updateError } = updateViewModel.getState();
  
  const loading = createLoading || updateLoading;
  const error = createError || updateError;
  console.log(product)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      slug: product?.slug || '',
      price: product?.price ? Number(product.price) : 0,
      stock: product?.stock || 0,
      type: product?.type || 'physical',
      sku: product?.sku || '',
      categoryId: product?.category.id || 0,
      active: product?.active ?? true,
      exclusiveOnline: product?.exclusiveOnline ?? false,
      weight: product?.weight ? Number(product.weight) : undefined,
    },
  });

  const onSubmit = async (formData: ProductFormData) => {
    console.log('Form data submitted:', formData);
    const data: CreateProductData | UpdateProductData = {
      name: formData.name,
      description: formData.description,
      slug: formData.slug,
      price: formData.price,
      stock: formData.stock,
      type: formData.type,
      sku: formData.sku,
      categoryId: formData.categoryId,
      active: formData.active,
      exclusiveOnline: formData.exclusiveOnline,
      weight: formData.weight || undefined,
    };

    const success = product 
      ? await updateViewModel.updateProduct(product.id, data)
      : await createViewModel.createProduct(data as CreateProductData);
    
    if (success) {
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 border border-gray-700 text-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-red-500">
        {product ? 'Modifier le produit' : 'Nouveau produit'}
      </h2>

      <ErrorMessage message={error} />

      <FormSection 
        title="Informations générales"
        description="Informations de base du produit"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom *"
            type="text"
            error={errors.name?.message}
            variant="dark"
            {...register('name')}
          />

          <Input
            label="Slug *"
            type="text"
            error={errors.slug?.message}
            variant="dark"
            {...register('slug')}
          />

          <Input
            label="SKU *"
            type="text"
            error={errors.sku?.message}
            variant="dark"
            {...register('sku')}
          />

          <Select
            label="Catégorie *"
            error={errors.categoryId?.message}
            variant="dark"
            {...register('categoryId', { valueAsNumber: true })}
          >
            <option value="">Sélectionner une catégorie</option>
            {allCategories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </div>

        <TextArea
          label="Description *"
          rows={4}
          error={errors.description?.message}
          variant="dark"
          {...register('description')}
        />
      </FormSection>

      <FormSection 
        title="Tarification et inventaire"
        description="Prix, stock et caractéristiques du produit"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prix *"
            type="number"
            step="0.01"
            error={errors.price?.message}
            variant="dark"
            {...register('price', { valueAsNumber: true })}
          />

          <Input
            label="Stock *"
            type="number"
            error={errors.stock?.message}
            variant="dark"
            {...register('stock', { valueAsNumber: true })}
          />

          <Select
            label="Type *"
            error={errors.type?.message}
            variant="dark"
            {...register('type')}
          >
            <option value="physical">Physique</option>
            <option value="digital">Numérique</option>
            <option value="subscription">Abonnement</option>
          </Select>

          <Input
            label="Poids (kg)"
            type="number"
            step="0.01"
            error={errors.weight?.message}
            variant="dark"
            {...register('weight', { valueAsNumber: true })}
          />
        </div>
      </FormSection>

      <FormSection title="Options">
        <div className="flex gap-4">
          <Checkbox
            label="Actif"
            variant="dark"
            {...register('active')}
          />

          <Checkbox
            label="Exclusivité en ligne"
            variant="dark"
            {...register('exclusiveOnline')}
          />
        </div>
      </FormSection>

      <FormActions align="left">
        <Button
          type="submit"
          disabled={loading || isSubmitting}
          variant="primary"
        >
          {loading || isSubmitting ? 'Enregistrement...' : product ? 'Mettre à jour' : 'Créer'}
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
