/**
 * Component: ProductTypeBadge
 * Atom ecommerce - Badge pour afficher le type de produit
 */

import React from 'react';
import { Badge } from '@/src/shared/components/atoms/Badge';
import { ProductType } from '@/src/ecommerce/domain/entities/Product';

interface ProductTypeBadgeProps {
  type: ProductType;
  className?: string;
}

const typeLabels: Record<ProductType, string> = {
  physical: 'Produit physique',
  digital: 'Produit numérique',
  subscription: 'Abonnement',
};

export const ProductTypeBadge: React.FC<ProductTypeBadgeProps> = ({
  type,
  className = '',
}) => {
  const variant = type === 'digital' ? 'info' : type === 'subscription' ? 'secondary' : 'default';
  
  return (
    <Badge variant={variant} size="sm" className={className}>
      {typeLabels[type]}
    </Badge>
  );
};
