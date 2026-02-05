'use client';

import React, { useState, useEffect } from 'react';
import { useAdminEcommerce } from '../../context/AdminEcommerceContext';
import { Product, ProductFilters } from '../../../domain/entities/Product';
import { AdminProductCard } from '../molecules/AdminProductCard';

interface AdminProductListProps {
  onEdit?: (product: Product) => void;
}

export const AdminProductList: React.FC<AdminProductListProps> = ({ onEdit }) => {
  const { getProducts, deleteProduct } = useAdminEcommerce();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProducts.execute({ ...filters, page: currentPage });
      setProducts(response.member);
      setTotalPages(Math.ceil(response.totalItems / response.pagination.itemsPerPage));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [filters, currentPage]);

  const handleDelete = async (product: Product) => {
    if (!confirm(`Supprimer le produit "${product.name}" ?`)) return;
    
    try {
      await deleteProduct.execute(product.id);
      loadProducts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  if (loading) {
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
            onChange={(e) => setFilters({ ...filters, name: e.target.value || undefined })}
          />
          
          <select
            className="px-3 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setFilters({ ...filters, type: e.target.value as any || undefined })}
          >
            <option value="">Tous les types</option>
            <option value="physical">Physique</option>
            <option value="digital">Numérique</option>
            <option value="subscription">Abonnement</option>
          </select>
          
          <select
            className="px-3 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setFilters({ ...filters, active: e.target.value === 'true' ? true : e.target.value === 'false' ? false : undefined })}
          >
            <option value="">Tous les statuts</option>
            <option value="true">Actif</option>
            <option value="false">Inactif</option>
          </select>
          
          <button
            onClick={() => {
              setFilters({});
              setCurrentPage(1);
            }}
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
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
          >
            Précédent
          </button>
          <span className="px-4 py-2">
            Page {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};
