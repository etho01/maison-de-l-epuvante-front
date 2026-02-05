'use client';

import React, { useState, useEffect } from 'react';
import { useAdminEcommerce } from '../../context/AdminEcommerceContext';
import { Order } from '../../../domain/entities/Order';
import { OrderCard } from '../molecules/OrderCard';

interface AdminOrderListProps {
  onView?: (order: Order) => void;
}

export const AdminOrderList: React.FC<AdminOrderListProps> = ({ onView }) => {
  const { getOrders } = useAdminEcommerce();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getOrders.execute(currentPage);
      setOrders(response.member);
      setTotalPages(Math.ceil(response.totalItems / response.pagination.itemsPerPage));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [currentPage]);

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600 py-8">{error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onView={onView}
          />
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-8 text-gray-500">Aucune commande trouvée</div>
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
