'use client';

import React from 'react';
import { useGetOrdersViewModel } from '../../hooks/useGetOrdersViewModel';
import { Order } from '../../../domain/entities/Order';
import { OrderCard } from '../molecules/OrderCard';

interface AdminOrderListProps {
  onView?: (order: Order) => void;
}

export const AdminOrderList: React.FC<AdminOrderListProps> = ({ onView }) => {
  const viewModel = useGetOrdersViewModel();
  const { orders, loading, error, pagination } = viewModel.getState();

  if (loading && orders.length === 0) {
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
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => viewModel.loadOrders(Math.max(1, pagination.page - 1))}
            disabled={!pagination.hasPreviousPage}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
          >
            Précédent
          </button>
          <span className="px-4 py-2">
            Page {pagination.page} / {pagination.totalPages}
          </span>
          <button
            onClick={() => viewModel.loadOrders(Math.min(pagination.totalPages, pagination.page + 1))}
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
