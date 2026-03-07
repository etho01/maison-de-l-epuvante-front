/**
 * Component: DeliveryStatusBadge
 * Molecule - Badge de statut de livraison avec styles prédéfinis
 */

import React from 'react';
import { Badge } from '../../atoms/Badge';
import { DeliveryStatus } from '@/src/ecommerce/domain/entities/Devivery';
import { DELIVERY_STATUS_LABELS } from '@/src/ecommerce/domain/constants/deliveryStatus';
import { DELIVERY_STATUS_VARIANTS } from '@/src/ecommerce/presentation/constants/deliveryStatus';

// Ré-exporté pour rétrocompatibilité des consommateurs existants
export type { DeliveryStatus };

interface DeliveryStatusBadgeProps {
  status: DeliveryStatus;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const DeliveryStatusBadge: React.FC<DeliveryStatusBadgeProps> = ({
  status,
  size = 'sm',
  className = '',
}) => {
  return (
    <Badge variant={DELIVERY_STATUS_VARIANTS[status]} size={size} className={className}>
      {DELIVERY_STATUS_LABELS[status]}
    </Badge>
  );
};
