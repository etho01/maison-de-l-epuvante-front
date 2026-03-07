'use client';

import React, { useState } from 'react';
import { AdminProductList } from '@/src/ecommerce/presentation/components/organisms/Product/Admin/AdminProductList';
import { AdminProductForm } from '@/src/ecommerce/presentation/components/organisms/Product/Admin/AdminProductForm';
import { Product } from '@/src/ecommerce/domain/entities/Product';
import { Pagination } from '@/src/shared/domain/Pagination';
import { Category } from '@/src/ecommerce/domain/entities/Category';
import { Button } from '@/src/shared/components/atoms';

interface AdminProductsClientProps {
 initialProducts?: Product[];
 initialPagination?: Pagination;
 allCategories?: Category[];
}

export default function AdminProductsClient({
  initialProducts = [],
  initialPagination,
  allCategories = [],
}: AdminProductsClientProps) {
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
        <h1 className="text-3xl font-bold bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">Gestion des Produits</h1>
        <Button
          onClick={() => setShowForm(true)}
          variant="primary"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nouveau produit</span>
        </Button>
      </div>

      {showForm ? (
        <AdminProductForm
          allCategories={allCategories}
          product={editingProduct}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <AdminProductList 
          onEdit={handleEdit} 
          initialProducts={initialProducts}
          initialPagination={initialPagination}
        />
      )}
    </div>
  );
}
