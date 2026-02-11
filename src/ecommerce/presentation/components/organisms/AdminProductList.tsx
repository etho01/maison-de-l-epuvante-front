'use client';

import React, { useState } from 'react';
import { useGetProductsViewModel } from '../../hooks/useGetProductsViewModel';
import { useDeleteProductViewModel } from '../../hooks/useDeleteProductViewModel';
import { Product } from '../../../domain/entities/Product';
import { AdminProductCard } from '../molecules/AdminProductCard';
import { Input, Select, Button } from '@/src/shared/components/atoms';
import { ConfirmModal } from '@/src/shared/components/molecules';
import { Pagination } from '@/src/shared/domain/Pagination';
import { init } from 'next/dist/compiled/webpack/webpack';
import { PaginationComponent } from '@/src/shared/components/molecules/Pagination';

interface AdminProductListProps {
  onEdit?: (product: Product) => void;
  initialProducts?: Product[];
  initialPagination?: Pagination;
}

export const AdminProductList: React.FC<AdminProductListProps> = ({ onEdit, initialProducts, initialPagination }) => {
  const listViewModel = useGetProductsViewModel(initialProducts, initialPagination);
  const deleteViewModel = useDeleteProductViewModel();
  const { products, loading, error, pagination } = listViewModel.getState();
  const { loading: deleteLoading } = deleteViewModel.getState();

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    
    const success = await deleteViewModel.deleteProduct(productToDelete.id);
    if (success) {
      setProductToDelete(null);
      listViewModel.loadProducts();
    } else {
      const deleteError = deleteViewModel.getState().error;
      if (deleteError) alert(deleteError);
    }
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

  if (error) {
    return <div className="text-red-600 py-8">{error}</div>;
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 bg-gray-900 p-4 rounded-lg shadow border border-gray-700">
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
            <option value="physical">Physique</option>
            <option value="digital">Numérique</option>
            <option value="subscription">Abonnement</option>
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
        {products.map((product) => (
          <AdminProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">Aucun produit trouvé</div>
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
