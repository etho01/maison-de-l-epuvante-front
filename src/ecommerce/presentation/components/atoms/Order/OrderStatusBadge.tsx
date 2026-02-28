'use client';

import React from 'react';
import { OrderStatus, ORDER_STATUS_LABELS } from '@/src/ecommerce/domain/entities/Order';
import { ORDER_STATUS_VARIANTS } from '@/src/ecommerce/presentation/constants/orderStatus';
import { Badge } from '@/src/shared/components/atoms/Badge';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, size = 'sm', className = '' }) => {
  return (
    <Badge variant={ORDER_STATUS_VARIANTS[status]} size={size} className={className}>
      {ORDER_STATUS_LABELS[status]}
    </Badge>
  );
};
