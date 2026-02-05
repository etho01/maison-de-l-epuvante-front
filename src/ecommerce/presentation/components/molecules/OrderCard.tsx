'use client';

import React from 'react';
import { Order } from '../../../domain/entities/Order';
import { OrderStatusBadge } from '../atoms/OrderStatusBadge';

interface OrderCardProps {
  order: Order;
  onView?: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onView }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
         onClick={() => onView?.(order)}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">Commande #{order.orderNumber}</h3>
          <p className="text-sm text-gray-500">
            {order.user.firstName} {order.user.lastName}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600">
          {order.items.length} article{order.items.length > 1 ? 's' : ''}
        </p>
        <p className="text-sm text-gray-500">
          {new Date(order.createdAt).toLocaleDateString('fr-FR')}
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-2 border-t">
        <span className="text-2xl font-bold text-gray-900">{order.totalAmount} €</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView?.(order);
          }}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Voir détails
        </button>
      </div>
    </div>
  );
};
