/**
 * Component: AddToCartButton
 * Atom ecommerce - Bouton d'ajout au panier avec gestion de quantité
 */

'use client';

import React from 'react';
import Button from '@/src/shared/components/atoms/Button';

interface AddToCartButtonProps {
  onAdd: () => void;
  disabled?: boolean;
  currentQuantity?: number;
  loading?: boolean;
  className?: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onAdd,
  disabled = false,
  currentQuantity = 0,
  loading = false,
  className = '',
}) => {
  return (
    <Button
      onClick={onAdd}
      disabled={disabled || loading}
      isLoading={loading}
      className={className}
    >
      {currentQuantity > 0 
        ? `Ajouter au panier (${currentQuantity})` 
        : 'Ajouter au panier'
      }
    </Button>
  );
};
