'use client';

import React, { useState, useEffect } from 'react';
import { useCreateProductViewModel } from '../../hooks/useCreateProductViewModel';
import { useUpdateProductViewModel } from '../../hooks/useUpdateProductViewModel';
import { useGetAllCategoriesViewModel } from '../../hooks/useGetAllCategoriesViewModel';
import { Product, CreateProductData, UpdateProductData } from '../../../domain/entities/Product';
import { Category } from '../../../domain/entities/Category';
import { Input, Select, TextArea, Button, Checkbox, ErrorMessage } from '@/src/shared/components/atoms';
import { FormSection, FormActions } from '@/src/shared/components/molecules';

interface AdminProductFormProps {
  product?: Product;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const AdminProductForm: React.FC<AdminProductFormProps> = ({ product, onSuccess, onCancel }) => {
  const createViewModel = useCreateProductViewModel();
  const updateViewModel = useUpdateProductViewModel();
  const categoriesViewModel = useGetAllCategoriesViewModel();
  const categories = categoriesViewModel.getState().categories;
  const { loading: createLoading, error: createError } = createViewModel.getState();
  const { loading: updateLoading, error: updateError } = updateViewModel.getState();
  
  const loading = createLoading || updateLoading;
  const error = createError || updateError;
  
  useEffect(() => {
    categoriesViewModel.loadCategories();
  }, []);

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    slug: product?.slug || '',
    price: product?.price || '',
    stock: product?.stock || 0,
    type: product?.type || 'physical' as const,
    sku: product?.sku || '',
    category: product?.category.id.toString() || '',
    active: product?.active ?? true,
    exclusiveOnline: product?.exclusiveOnline ?? false,
    weight: product?.weight || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: CreateProductData | UpdateProductData = {
      name: formData.name,
      description: formData.description,
      slug: formData.slug,
      price: formData.price,
      stock: formData.stock,
      type: formData.type,
      sku: formData.sku,
      category: `/api/categories/${formData.category}`,
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
    <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-700 text-white p-6 rounded-lg shadow space-y-6">
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

          <Input
            label="SKU *"
            type="text"
            required
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            variant="dark"
          />

          <Select
            label="Catégorie *"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            variant="dark"
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </div>

        <TextArea
          label="Description *"
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          variant="dark"
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
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            variant="dark"
          />

          <Input
            label="Stock *"
            type="number"
            required
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
            variant="dark"
          />

          <Select
            label="Type *"
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
            variant="dark"
          >
            <option value="physical">Physique</option>
            <option value="digital">Numérique</option>
            <option value="subscription">Abonnement</option>
          </Select>

          <Input
            label="Poids (kg)"
            type="text"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            variant="dark"
          />
        </div>
      </FormSection>

      <FormSection title="Options">
        <div className="flex gap-4">
          <Checkbox
            label="Actif"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            variant="dark"
          />

          <Checkbox
            label="Exclusivité en ligne"
            checked={formData.exclusiveOnline}
            onChange={(e) => setFormData({ ...formData, exclusiveOnline: e.target.checked })}
            variant="dark"
          />
        </div>
      </FormSection>

      <FormActions align="left">
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
        >
          {loading ? 'Enregistrement...' : product ? 'Mettre à jour' : 'Créer'}
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
