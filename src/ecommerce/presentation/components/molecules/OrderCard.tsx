'use client';

import React from 'react';
import { Order } from '../../../domain/entities/Order';
import { OrderStatusBadge } from '../atoms/Order/OrderStatusBadge';
import { Button } from '@/src/shared/components/atoms';

interface OrderCardProps {
  order: Order;
  onView?: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onView }) => {
  return (
    <div className="glass-effect border border-crimson-900/30 rounded-xl p-4 hover:border-crimson-700/50 hover:shadow-crimson-md transition-all duration-200 cursor-pointer"
         onClick={() => onView?.(order)}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-100">Commande #{order.orderNumber}</h3>
          <p className="text-sm text-neutral-400">
            {order.user.firstName} {order.user.lastName}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-neutral-300">
          {order.items.length} article{order.items.length > 1 ? 's' : ''}
        </p>
        <p className="text-sm text-neutral-400">
          {new Date(order.createdAt).toLocaleDateString('fr-FR')}
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-2 border-t border-neutral-800/50">
        <span className="text-2xl font-bold text-neutral-100">{order.totalAmount} €</span>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onView?.(order);
          }}
          variant="secondary"
          size="sm"
        >
          Voir détails
        </Button>
      </div>
    </div>
  );
};
