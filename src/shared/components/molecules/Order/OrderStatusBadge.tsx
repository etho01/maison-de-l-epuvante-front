/**
 * Component: OrderStatusBadge
 * Molecule - Badge de statut de commande avec styles prédéfinis
 */

import React from 'react';
import { Badge } from '../../atoms/Badge';
import { OrderStatus } from '@/src/ecommerce/domain/entities/Order';
import { ORDER_STATUS_LABELS } from '@/src/ecommerce/domain/constants/orderStatus';
import { ORDER_STATUS_VARIANTS } from '@/src/ecommerce/presentation/constants/orderStatus';

// Ré-exporté pour rétrocompatibilité des consommateurs existants
export type { OrderStatus };

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  size = 'sm',
  className = '',
}) => {
  return (
    <Badge variant={ORDER_STATUS_VARIANTS[status]} size={size} className={className}>
      {ORDER_STATUS_LABELS[status]}
    </Badge>
  );
};
