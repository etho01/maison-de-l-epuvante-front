'use client';

import React, { useEffect } from 'react';
import { useGetDeliveriesViewModel } from '../../../../hooks/deliveries';
import { Delivery } from '../../../../../domain/entities/Devivery';
import { Button } from '@/src/shared/components/atoms';
import { Pagination } from '@/src/shared/domain/Pagination';
import { DeliveryStatusBadge } from '../../../atoms/Delivery/DeliveryStatusBadge';
import { PaginationComponent } from '@/src/shared/components/molecules/Pagination';
import { useRouter } from 'next/navigation';

interface AdminDeliveryListProps {
  onView?: (delivery: Delivery) => void;
  initialDeliveries?: Delivery[];
  initialPagination?: Pagination;
}

export const AdminDeliveryList: React.FC<AdminDeliveryListProps> = ({ 
  onView,
  initialDeliveries = [],
  initialPagination 
}) => {
  const viewModel = useGetDeliveriesViewModel(initialDeliveries, initialPagination);
  const { deliveries, loading, pagination, error } = viewModel.getState();

  const router = useRouter();

  useEffect(() => {
    // Only load if no initial data was provided
    if (initialDeliveries.length === 0) {
      viewModel.loadDeliveries();
    }
  }, []);

  if (loading && deliveries.length === 0) {
    return <div className="text-center py-8 text-neutral-400">Chargement...</div>;
  }

  const showDelivery = (delivery: Delivery) => {
    router.push(`/admin/livraisons/${delivery.id}`);
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
      
      <div className="glass-effect border border-crimson-900/30 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-950/50 border-b border-neutral-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Adresse</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Statut</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Articles</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Date de livraison</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/50">
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="hover:bg-neutral-900/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-neutral-300">
                    <div>{delivery.shippingAddress.city}</div>
                    <div className="text-sm text-neutral-500">{delivery.shippingAddress.postalCode}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <DeliveryStatusBadge status={delivery.status} />
                </td>
                <td className="px-6 py-4 text-neutral-300">{delivery.items.length} article(s)</td>
                <td className="px-6 py-4 text-neutral-300">
                  {delivery.deliveredAt 
                    ? new Date(delivery.deliveredAt).toLocaleDateString('fr-FR')
                    : '-'
                  }
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    onClick={() => showDelivery(delivery)}
                    variant="secondary"
                    size="sm"
                  >
                    Voir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deliveries.length === 0 && !loading && (
        <div className="text-center py-8 text-neutral-400">Aucune livraison trouvée</div>
      )}

      <PaginationComponent
        pagination={pagination || undefined}
        onPageChange={(page: number) => viewModel.loadDeliveries(
          page
        )}
      />
    </div>
  );
};
