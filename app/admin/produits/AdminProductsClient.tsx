'use client';

import React, { useState } from 'react';
import { AdminProductList } from '@/src/ecommerce/presentation/components/organisms/AdminProductList';
import { AdminProductForm } from '@/src/ecommerce/presentation/components/organisms/AdminProductForm';
import { Product } from '@/src/ecommerce/domain/entities/Product';

export default function AdminProductsClient() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingProduct(undefined);
    window.location.reload();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Produits</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Nouveau produit
        </button>
      </div>

      {showForm ? (
        <AdminProductForm
          product={editingProduct}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <AdminProductList onEdit={handleEdit} />
      )}
    </div>
  );
}
