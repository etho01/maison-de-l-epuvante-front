'use client';

import React from 'react';
import { useGetProductsViewModel } from '../../hooks/useGetProductsViewModel';
import { useDeleteProductViewModel } from '../../hooks/useDeleteProductViewModel';
import { Product } from '../../../domain/entities/Product';
import { AdminProductCard } from '../molecules/AdminProductCard';

interface AdminProductListProps {
  onEdit?: (product: Product) => void;
}

export const AdminProductList: React.FC<AdminProductListProps> = ({ onEdit }) => {
  const listViewModel = useGetProductsViewModel();
  const deleteViewModel = useDeleteProductViewModel();
  const { products, loading, error, pagination } = listViewModel.getState();

  const handleDelete = async (product: Product) => {
    if (!confirm(`Supprimer le produit "${product.name}" ?`)) return;
    
    const success = await deleteViewModel.deleteProduct(product.id);
    if (success) {
      listViewModel.loadProducts();
    } else {
      const deleteError = deleteViewModel.getState().error;
      if (deleteError) alert(deleteError);
    }
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
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Rechercher par nom..."
            className="px-3 py-2 border border-gray-300 rounded-md"
            onChange={(e) => handleFilterChange('name', e.target.value || undefined)}
          />
          
          <select
            className="px-3 py-2 border border-gray-300 rounded-md"
            onChange={(e) => handleFilterChange('type', e.target.value || undefined)}
          >
            <option value="">Tous les types</option>
            <option value="physical">Physique</option>
            <option value="digital">Numérique</option>
            <option value="subscription">Abonnement</option>
          </select>
          
          <select
            className="px-3 py-2 border border-gray-300 rounded-md"
            onChange={(e) => handleFilterChange('active', e.target.value === 'true' ? true : e.target.value === 'false' ? false : undefined)}
          >
            <option value="">Tous les statuts</option>
            <option value="true">Actif</option>
            <option value="false">Inactif</option>
          </select>
          
          <button
            onClick={() => listViewModel.setFilters({ page: 1 })}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {products.map((product) => (
          <AdminProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">Aucun produit trouvé</div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => listViewModel.setFilters({ page: Math.max(1, pagination.page - 1) })}
            disabled={!pagination.hasPreviousPage}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
          >
            Précédent
          </button>
          <span className="px-4 py-2">
            Page {pagination.page} / {pagination.totalPages}
          </span>
          <button
            onClick={() => listViewModel.setFilters({ page: Math.min(pagination.totalPages, pagination.page + 1) })}
            disabled={!pagination.hasNextPage}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};
