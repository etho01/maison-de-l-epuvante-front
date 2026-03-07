'use client';

import React, { useState } from 'react';
import { useGetProductsViewModel, useDeleteProductViewModel } from '../../../../hooks/products';
import { Product, ProductType } from '../../../../../domain/entities/Product';
import { AdminProductCard } from '../../../molecules/Product/Admin/AdminProductCard';
import { Input, Select, Button } from '@/src/shared/components/atoms';
import { ConfirmModal } from '@/src/shared/components/molecules';
import { Pagination } from '@/src/shared/domain/Pagination';
import { init } from 'next/dist/compiled/webpack/webpack';
import { PaginationComponent } from '@/src/shared/components/molecules/Pagination';
import { ApiError } from '@/src/shared/domain/ApiError';

interface AdminProductListProps {
  onEdit?: (product: Product) => void;
  initialProducts?: Product[];
  initialPagination?: Pagination;
}

export const AdminProductList: React.FC<AdminProductListProps> = ({ onEdit, initialProducts, initialPagination }) => {
  const listViewModel = useGetProductsViewModel(initialProducts, initialPagination);
  const deleteViewModel = useDeleteProductViewModel();
  const { products, loading, pagination } = listViewModel.getState();
  const { loading: deleteLoading } = deleteViewModel.getState();

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    
    setError(null);
    deleteViewModel.deleteProduct(productToDelete.id)
      .then(() => {
        setProductToDelete(null);
        listViewModel.loadProducts();
      })
      .catch((err: ApiError) => {
        setError(err.message || 'Erreur lors de la suppression du produit');
      });
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
  };

  const handleFilterChange = (key: string, value: any) => {
    listViewModel.setFilters({ [key]: value });
  };

  if (loading && products.length === 0) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 glass-effect border border-crimson-700/50 bg-crimson-950/30 text-crimson-400 rounded-xl flex items-start gap-3">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">{error}</div>
        </div>
      )}
      
      {/* Filters */}
      <div className="mb-6 glass-effect p-4 rounded-xl shadow-crimson-md border border-crimson-900/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="text"
            placeholder="Rechercher par nom..."
            onChange={(e) => handleFilterChange('name', e.target.value || undefined)}
            variant="dark"
          />
          
          <Select
            onChange={(e) => handleFilterChange('type', e.target.value || undefined)}
            variant="dark"
          >
            <option value="">Tous les types</option>
            <option value={ProductType.PHYSICAL}>Physique</option>
            <option value={ProductType.DIGITAL}>Numérique</option>
          </Select>
          
          <Select
            onChange={(e) => handleFilterChange('active', e.target.value === 'true' ? true : e.target.value === 'false' ? false : undefined)}
            variant="dark"
          >
            <option value="">Tous les statuts</option>
            <option value="true">Actif</option>
            <option value="false">Inactif</option>
          </Select>
          
          <Button
            onClick={() => listViewModel.setFilters({ page: 1 })}
            variant="secondary"
          >
            Réinitialiser
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {products.map((product: Product) => (
          <AdminProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-8 text-neutral-400">Aucun produit trouvé</div>
      )}

      <PaginationComponent
        pagination={initialPagination}
        onPageChange={(page: number) => listViewModel.setFilters({
          page
        })}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!productToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Supprimer le produit"
        message={`Êtes-vous sûr de vouloir supprimer le produit "${productToDelete?.name}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="danger"
        isLoading={deleteLoading}
      />
    </div>
  );
};
