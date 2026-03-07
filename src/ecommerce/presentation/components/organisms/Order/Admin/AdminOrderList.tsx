'use client';

import React from 'react';
import { useGetOrdersViewModel } from '../../../../hooks/orders';
import { Order, OrderStatus, OrderStatusEnum } from '../../../../../domain/entities/Order';
import { OrderCard } from '../../../molecules/OrderCard';
import { Button, Select } from '@/src/shared/components/atoms';
import { ORDER_STATUS_LABELS } from '@/src/ecommerce/domain/constants/orderStatus';

interface AdminOrderListProps {
  onView?: (order: Order) => void;
}

export const AdminOrderList: React.FC<AdminOrderListProps> = ({ onView }) => {
  const viewModel = useGetOrdersViewModel();
  const { orders, loading, pagination, currentStatus } = viewModel.getState();
  const [error, setError] = React.useState<string | null>(null);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const status = value === '' ? null : (value as OrderStatus);
    viewModel.setStatus(status).catch((err) => {
      setError('Erreur lors du filtrage des commandes');
    });
  };

  if (loading && orders.length === 0) {
    return <div className="text-center py-8 text-neutral-400">Chargement...</div>;
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 glass-effect border border-crimson-700/50 text-crimson-200 rounded-xl flex items-start gap-3">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Filtres */}
      <div className="mb-6 glass-effect border border-crimson-900/30 p-4 rounded-xl">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-neutral-300">Filtrer par statut:</label>
          <Select
            value={currentStatus || ''}
            onChange={handleStatusChange}
            disabled={loading}
            className="w-64"
          >
            <option value="">Tous les statuts</option>
            {Object.entries(ORDER_STATUS_LABELS).map(([status, label]) => (
              <option key={status} value={status}>
                {label}
              </option>
            ))}
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onView={onView}
          />
        ))}
      </div>

      {orders.length === 0 && !loading && (
        <div className="text-center py-8 text-neutral-400">Aucune commande trouvée</div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => viewModel.loadOrders(Math.max(1, pagination.page - 1))}
            disabled={!pagination.hasPreviousPage || loading}
            variant="secondary"
            size="sm"
          >
            Précédent
          </Button>
          <span className="px-4 py-2 text-neutral-300">
            Page {pagination.page} / {pagination.totalPages}
          </span>
          <Button
            onClick={() => viewModel.loadOrders(Math.min(pagination.totalPages, pagination.page + 1))}
            disabled={!pagination.hasNextPage || loading}
            variant="secondary"
            size="sm"
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
};
