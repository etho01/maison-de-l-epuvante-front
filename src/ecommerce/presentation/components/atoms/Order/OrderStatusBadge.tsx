'use client';

import React from 'react';
import { OrderStatus } from '../../../domain/entities/Order';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' };
      case 'processing':
        return { label: 'En cours', color: 'bg-blue-100 text-blue-800' };
      case 'paid':
        return { label: 'Payée', color: 'bg-green-100 text-green-800' };
      case 'shipped':
        return { label: 'Expédiée', color: 'bg-indigo-100 text-indigo-800' };
      case 'delivered':
        return { label: 'Livrée', color: 'bg-teal-100 text-teal-800' };
      case 'cancelled':
        return { label: 'Annulée', color: 'bg-red-100 text-red-800' };
      case 'refunded':
        return { label: 'Remboursée', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};
