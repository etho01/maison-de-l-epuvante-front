'use client';

import React, { useState, useEffect } from 'react';
import { useCreateProductViewModel } from '../../hooks/useCreateProductViewModel';
import { useUpdateProductViewModel } from '../../hooks/useUpdateProductViewModel';
import { useGetAllCategoriesViewModel } from '../../hooks/useGetAllCategoriesViewModel';
import { Product, CreateProductData, UpdateProductData } from '../../../domain/entities/Product';
import { Category } from '../../../domain/entities/Category';

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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        {product ? 'Modifier le produit' : 'Nouveau produit'}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
          <input
            type="text"
            required
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prix *</label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
          <input
            type="number"
            required
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
          <select
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="physical">Physique</option>
            <option value="digital">Numérique</option>
            <option value="subscription">Abonnement</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Poids (kg)</label>
          <input
            type="text"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm text-gray-700">Actif</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.exclusiveOnline}
            onChange={(e) => setFormData({ ...formData, exclusiveOnline: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm text-gray-700">Exclusivité en ligne</span>
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Enregistrement...' : product ? 'Mettre à jour' : 'Créer'}
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
