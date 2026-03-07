'use client';

import React, { useState, useEffect } from 'react';
import { Select, Button } from '@/src/shared/components/atoms';
import { ApiError } from '@/src/shared/domain/ApiError';
import { DeliveryStatusBadge } from '@/src/shared/components';
import { useGetDeliveryByIdViewModel, useUpdateDeliveryStatusViewModel } from '@/src/ecommerce/presentation/hooks/deliveries';
import { DeliveryStatus } from '@/src/ecommerce/domain/entities/Devivery';
import { DELIVERY_STATUS_LABELS } from '@/src/ecommerce/domain/constants/deliveryStatus';

interface AdminDeliveryDetailProps {
  deliveryId: number;
  onUpdate?: () => void;
  onClose?: () => void;
}

export const AdminDeliveryDetail: React.FC<AdminDeliveryDetailProps> = ({ deliveryId, onUpdate, onClose }) => {
  const getDeliveryViewModel = useGetDeliveryByIdViewModel();
  const updateDeliveryStatusViewModel = useUpdateDeliveryStatusViewModel();
  const { delivery, loading: getLoading } = getDeliveryViewModel.getState();
  const { loading: updateLoading } = updateDeliveryStatusViewModel.getState();
  
  const loading = getLoading || updateLoading;
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<DeliveryStatus | null>(null);

  useEffect(() => {
    const loadDelivery = () => {
      setError(null);
      getDeliveryViewModel.loadDelivery(deliveryId)
        .catch((err: ApiError) => {
          setError(err.message || 'Erreur lors du chargement de la livraison');
        });
    };
    loadDelivery();
  }, [deliveryId]);

  useEffect(() => {
    if (delivery) {
      setSelectedStatus(delivery.status);
    }
  }, [delivery]);

  const handleUpdateStatus = () => {
    if (!delivery || !selectedStatus) return;
    
    setError(null);
    updateDeliveryStatusViewModel.updateStatus(delivery.id, selectedStatus)
      .then(() => {
        onUpdate?.();
      })
      .catch((err: ApiError) => {
        setError(err.message || 'Erreur lors de la mise à jour de la livraison');
      });
  };

  if (loading && !delivery) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (!delivery) {
    return (
      <div className="text-center py-8 glass-effect border border-crimson-700/50 text-crimson-200 rounded-xl p-4 flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        Livraison introuvable
      </div>
    );
  }

  return (
    <div className="glass-effect border border-crimson-900/30 p-6 rounded-xl shadow-crimson-md max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <DeliveryStatusBadge status={delivery.status} />
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">Livraison #{delivery.id}</h2>
          <p className="text-neutral-400">Date de livraison: {delivery.deliveredAt ? new Date(delivery.deliveredAt).toLocaleString('fr-FR') : 'Non livrée'}</p>
        </div>
        {onClose && (
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            aria-label="Fermer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        )}
      </div>

      {error && (
        <div className="glass-effect border border-crimson-700/50 text-crimson-200 px-4 py-3 rounded-xl mb-4 flex items-start gap-3">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Shipping Address */}
      <div className="mb-6 p-4 bg-neutral-950/30 rounded-xl border border-neutral-800/50">
        <h3 className="font-semibold mb-2 text-neutral-100">Adresse de livraison</h3>
        <p className="text-neutral-300">{delivery.shippingAddress.firstName} {delivery.shippingAddress.lastName}</p>
        <p className="text-neutral-300">{delivery.shippingAddress.address}</p>
        <p className="text-neutral-300">{delivery.shippingAddress.postalCode} {delivery.shippingAddress.city}</p>
        <p className="text-neutral-300">{delivery.shippingAddress.country}</p>
      </div>

      {/* Items */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-neutral-100">Articles</h3>
        <div className="space-y-2">
          {delivery.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 bg-neutral-950/30 rounded-xl border border-neutral-800/50">
              <div>
                <p className="font-medium text-neutral-100">{item.productName}</p>
                <p className="text-sm text-neutral-400">
                  Quantité: {item.quantity} × {item.unitPrice} €
                </p>
              </div>
              <p className="font-semibold text-neutral-100">{item.totalPrice} €</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
