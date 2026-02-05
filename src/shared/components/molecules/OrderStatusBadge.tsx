/**
 * Component: OrderStatusBadge
 * Molecule - Badge de statut de commande avec styles prédéfinis
 */

import React from 'react';
import { Badge, BadgeVariant } from '../atoms/Badge';

export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'paid' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const statusLabels: Record<OrderStatus, string> = {
  pending: 'En attente',
  processing: 'En cours',
  paid: 'Payée',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
  refunded: 'Remboursée',
};

const statusVariants: Record<OrderStatus, BadgeVariant> = {
  pending: 'warning',
  processing: 'info',
  paid: 'success',
  shipped: 'secondary',
  delivered: 'success',
  cancelled: 'danger',
  refunded: 'default',
};

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  size = 'sm',
  className = '',
}) => {
  return (
    <Badge variant={statusVariants[status]} size={size} className={className}>
      {statusLabels[status]}
    </Badge>
  );
};
