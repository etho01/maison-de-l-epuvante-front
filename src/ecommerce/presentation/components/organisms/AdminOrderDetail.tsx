'use client';

import React, { useState, useEffect } from 'react';
import { useGetOrderByIdViewModel } from '../../hooks/useGetOrderByIdViewModel';
import { useUpdateOrderViewModel } from '../../hooks/useUpdateOrderViewModel';
import { Order, OrderStatus } from '../../../domain/entities/Order';
import { OrderStatusBadge } from '../atoms/OrderStatusBadge';
import { Select, TextArea, Button } from '@/src/shared/components/atoms';

interface AdminOrderDetailProps {
  orderId: number;
  onUpdate?: () => void;
  onClose?: () => void;
}

const ORDER_STATUSES: OrderStatus[] = [
  'pending',
  'processing',
  'paid',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
];

export const AdminOrderDetail: React.FC<AdminOrderDetailProps> = ({ orderId, onUpdate, onClose }) => {
  const getOrderViewModel = useGetOrderByIdViewModel();
  const updateOrderViewModel = useUpdateOrderViewModel();
  const { order, loading: getLoading, error: getError } = getOrderViewModel.getState();
  const { loading: updateLoading, error: updateError } = updateOrderViewModel.getState();
  
  const loading = getLoading || updateLoading;
  const error = getError || updateError;
  
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    getOrderViewModel.loadOrder(orderId);
  }, [orderId]);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
      setAdminNotes(order.adminNotes || '');
    }
  }, [order]);

  const handleUpdateOrder = async () => {
    if (!order || !selectedStatus) return;
    
    const updatedOrder = await updateOrderViewModel.updateOrder(order.id, {
      status: selectedStatus,
      adminNotes: adminNotes || undefined,
    });

    if (updatedOrder) {
      onUpdate?.();
    }
  };

  if (loading && !order) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (!order) {
    return <div className="text-center py-8 text-red-600">Commande introuvable</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">Commande #{order.orderNumber}</h2>
          <p className="text-gray-500">{new Date(order.createdAt).toLocaleString('fr-FR')}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Client Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Client</h3>
        <p>{order.user.firstName} {order.user.lastName}</p>
        <p className="text-sm text-gray-600">{order.user.email}</p>
      </div>

      {/* Items */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Articles</h3>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-600">
                  Quantité: {item.quantity} × {item.unitPrice} €
                </p>
              </div>
              <p className="font-semibold">{item.totalPrice} €</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <span className="font-semibold text-lg">Total</span>
          <span className="font-bold text-2xl">{order.totalAmount} €</span>
        </div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Adresse de livraison</h3>
          <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
          <p>{order.shippingAddress.address}</p>
          <p>{order.shippingAddress.postalCode} {order.shippingAddress.city}</p>
          <p>{order.shippingAddress.country}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Adresse de facturation</h3>
          <p>{order.billingAddress.firstName} {order.billingAddress.lastName}</p>
          <p>{order.billingAddress.address}</p>
          <p>{order.billingAddress.postalCode} {order.billingAddress.city}</p>
          <p>{order.billingAddress.country}</p>
        </div>
      </div>

      {/* Payment */}
      <div className="mb-6 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Paiement</h3>
        <p>Méthode: {order.paymentMethod}</p>
      </div>

      {/* Customer Notes */}
      {order.customerNotes && (
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Notes du client</h3>
          <p>{order.customerNotes}</p>
        </div>
      )}

      {/* Status Update */}
      <div className="border-t pt-6">
        <h3 className="font-semibold mb-4">Gestion de la commande</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statut actuel
            </label>
            <div className="mb-2">
              <OrderStatusBadge status={order.status} />
            </div>
            <Select
              value={selectedStatus || ''}
              onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
              variant="dark"
            >
              {ORDER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
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
            variant="dark"
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
