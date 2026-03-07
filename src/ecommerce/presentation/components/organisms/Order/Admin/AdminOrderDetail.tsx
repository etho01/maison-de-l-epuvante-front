'use client';

import React, { useState, useEffect } from 'react';
import { Select, TextArea, Button } from '@/src/shared/components/atoms';
import { ApiError } from '@/src/shared/domain/ApiError';
import { OrderStatus, OrderStatusBadge } from '@/src/shared/components';
import { useGetOrderByIdViewModel, useUpdateOrderStatusViewModel } from '@/src/ecommerce/presentation/hooks';
import { OrderStatusEnum } from '@/src/ecommerce/domain/entities/Order';
import { DeliveryStatus } from '@/src/ecommerce/domain/entities/Devivery';

interface AdminOrderDetailProps {
  orderId: number;
  onUpdate?: () => void;
  onClose?: () => void;
}

const ORDER_STATUSES = {
  [OrderStatusEnum.PENDING]: 'En attente',
  [OrderStatusEnum.PAID]: 'Payée',
  [OrderStatusEnum.SHIPPED]: 'Expédiée',
  [OrderStatusEnum.DELIVERED]: 'Livrée',
  [OrderStatusEnum.CANCELLED]: 'Annulée',
  [OrderStatusEnum.REFUNDED]: 'Remboursée',
}

const DELIVERY_STATUSES = {
  [DeliveryStatus.PENDING]: 'En attente',
  [DeliveryStatus.SHIPPED]: 'Expédiée',
  [DeliveryStatus.DELIVERED]: 'Livrée',
  [DeliveryStatus.CANCELLED]: 'Annulée',
}

const getDeliveryStatusStyle = (status: DeliveryStatus) => {
  switch (status) {
    case DeliveryStatus.PENDING:
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    case DeliveryStatus.SHIPPED:
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case DeliveryStatus.DELIVERED:
      return 'bg-green-500/10 text-green-400 border-green-500/30';
    case DeliveryStatus.CANCELLED:
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    default:
      return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/30';
  }
}

export const AdminOrderDetail: React.FC<AdminOrderDetailProps> = ({ orderId, onUpdate, onClose }) => {
  const getOrderViewModel = useGetOrderByIdViewModel();
  const updateOrderStatusViewModel = useUpdateOrderStatusViewModel();
  const { order, loading: getLoading } = getOrderViewModel.getState();
  const { loading: updateLoading } = updateOrderStatusViewModel.getState();
  
  const loading = getLoading || updateLoading;
  const [error, setError] = useState<string | null>(null);
  
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    const loadOrder = () => {
      setError(null);
      getOrderViewModel.loadOrder(orderId)
        .catch((err: ApiError) => {
          setError(err.message || 'Erreur lors du chargement de la commande');
        });
    };
    loadOrder();
  }, [orderId]);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
      setAdminNotes(order.adminNotes || '');
    }
  }, [order]);

  const handleUpdateOrder = () => {
    if (!order || !selectedStatus) return;
    
    setError(null);
    updateOrderStatusViewModel.updateStatus(order.id, selectedStatus)
      .then(() => {
        onUpdate?.();
      })
      .catch((err: ApiError) => {
        setError(err.message || 'Erreur lors de la mise à jour de la commande');
      });
  };

  if (loading && !order) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (!order) {
    return (
      <div className="text-center py-8 glass-effect border border-crimson-700/50 text-crimson-200 rounded-xl p-4 flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        Commande introuvable
      </div>
    );
  }
  console.log('Order details:', order);

  return (
    <div className="glass-effect border border-crimson-900/30 p-6 rounded-xl shadow-crimson-md max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">Commande #{order.orderNumber}</h2>
          <p className="text-neutral-400">{new Date(order.createdAt).toLocaleString('fr-FR')}</p>
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

      {/* Client Info */}
      <div className="mb-6 p-4 bg-neutral-950/30 rounded-xl border border-neutral-800/50">
        <h3 className="font-semibold mb-2 text-neutral-100">Client</h3>
        <p className="text-neutral-300">{order.user.firstName} {order.user.lastName}</p>
        <p className="text-sm text-neutral-400">{order.user.email}</p>
      </div>

      {/* Items */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-neutral-100">Articles</h3>
        <div className="space-y-2">
          {order.items.map((item: any) => (
            <div key={item.id} className="flex justify-between items-center p-3 bg-neutral-950/30 rounded-xl border border-neutral-800/50">
              <div>
                <p className="font-medium text-neutral-100">{item.product.name}</p>
                <p className="text-sm text-neutral-400">
                  Quantité: {item.quantity} × {item.unitPrice} €
                </p>
              </div>
              <p className="font-semibold text-neutral-100">{item.totalPrice} €</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-800/50">
          <span className="font-semibold text-lg text-neutral-100">Total</span>
          <span className="font-bold text-2xl bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">{order.totalAmount} €</span>
        </div>
      </div>

      {/* Delivery Info */}
      {order.delivery && (
        <div className="mb-6 p-4 bg-neutral-950/30 rounded-xl border border-neutral-800/50">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-neutral-100">Informations de livraison</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDeliveryStatusStyle(order.delivery.status)}`}>
              {DELIVERY_STATUSES[order.delivery.status]}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-medium text-neutral-400 mb-2">Adresse de livraison</h4>
              <p className="text-neutral-300">{order.delivery.shippingAddress.firstName} {order.delivery.shippingAddress.lastName}</p>
              <p className="text-neutral-300">{order.delivery.shippingAddress.address}</p>
              <p className="text-neutral-300">{order.delivery.shippingAddress.postalCode} {order.delivery.shippingAddress.city}</p>
              <p className="text-neutral-300">{order.delivery.shippingAddress.country}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-neutral-400 mb-2">Date de livraison</h4>
              <p className="text-neutral-300">
                {order.delivery.deliveredAt 
                  ? new Date(order.delivery.deliveredAt).toLocaleString('fr-FR')
                  : 'Non livrée'}
              </p>
            </div>
          </div>

          {order.delivery.items && order.delivery.items.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-neutral-400 mb-2">Articles livrés</h4>
              <div className="space-y-2">
                {order.delivery.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2 bg-neutral-900/50 rounded-lg">
                    <div>
                      <p className="font-medium text-neutral-200">{item.name}</p>
                      <p className="text-sm text-neutral-400">Quantité: {item.quantity}</p>
                    </div>
                    <p className="text-neutral-300">{item.price} €</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {!order.delivery && (
          <div className="p-4 bg-neutral-950/30 rounded-xl border border-neutral-800/50 flex items-center justify-center">
            <span className="text-sm text-neutral-400">Pas de livraison (produits numériques uniquement)</span>
          </div>
        )}

        <div className="p-4 bg-neutral-950/30 rounded-xl border border-neutral-800/50">
          <h3 className="font-semibold mb-2 text-neutral-100">Adresse de facturation</h3>
          <p className="text-neutral-300">{order.billingAddress.firstName} {order.billingAddress.lastName}</p>
          <p className="text-neutral-300">{order.billingAddress.address}</p>
          <p className="text-neutral-300">{order.billingAddress.postalCode} {order.billingAddress.city}</p>
          <p className="text-neutral-300">{order.billingAddress.country}</p>
        </div>
      </div>

      {/* Payment */}
      <div className="mb-6 p-4 bg-neutral-950/30 rounded-xl border border-neutral-800/50">
        <h3 className="font-semibold mb-2 text-neutral-100">Paiement</h3>
        <p className="text-neutral-300">Méthode: {order.paymentMethod}</p>
      </div>

      {/* Customer Notes */}
      {order.customerNotes && (
        <div className="mb-6 p-4 bg-neutral-950/30 rounded-xl border border-neutral-800/50">
          <h3 className="font-semibold mb-2 text-neutral-100">Notes du client</h3>
          <p className="text-neutral-300">{order.customerNotes}</p>
        </div>
      )}

      {/* Status Update */}
      <div className="border-t border-neutral-800/50 pt-6">
        <h3 className="font-semibold mb-4 text-neutral-100">Gestion de la commande</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Statut actuel
            </label>
            <div className="mb-2">
              <OrderStatusBadge status={order.status} />
            </div>
            <Select
              value={selectedStatus || ''}
              onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
            >
              {Object.entries(ORDER_STATUSES).map(([status, label]) => (
                <option key={status} value={status}>
                  {label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="mb-4">
          <TextArea
            label="Notes admin"
            rows={3}
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Notes internes..."
          />
        </div>

        <Button
          onClick={handleUpdateOrder}
          disabled={loading}
          variant="primary"
        >
          {loading ? 'Mise à jour...' : 'Mettre à jour la commande'}
        </Button>
      </div>
    </div>
  );
};
