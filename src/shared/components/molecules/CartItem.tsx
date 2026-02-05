/**
 * Component: CartItem
 * Molecule - Item de panier réutilisable
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ProductImage } from './ProductImage';
import { PriceDisplay } from '../atoms/PriceDisplay';
import { QuantitySelector } from '../atoms/QuantitySelector';

export interface CartItemProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  images?: string[];
  stock: number;
}

interface CartItemProps {
  product: CartItemProduct;
  quantity: number;
  onRemove: () => void;
  onUpdateQuantity: (newQuantity: number) => void;
  className?: string;
}

export const CartItem: React.FC<CartItemProps> = ({
  product,
  quantity,
  onRemove,
  onUpdateQuantity,
  className = '',
}) => {
  const subtotal = parseFloat(product.price) * quantity;

  return (
    <div className={`border rounded-lg p-4 flex gap-4 ${className}`}>
      <ProductImage
        src={product.images?.[0]}
        alt={product.name}
        size="md"
      />

      <div className="flex-1">
        <Link href={`/produits/${product.slug}`} className="hover:underline">
          <h3 className="font-bold">{product.name}</h3>
        </Link>
        <div className="mt-2">
          <PriceDisplay price={product.price} variant="emphasis" />
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <button
          onClick={onRemove}
          className="text-red-600 hover:text-red-800 text-sm transition-colors"
        >
          Supprimer
        </button>

        <QuantitySelector
          quantity={quantity}
          min={1}
          max={product.stock}
          onIncrease={() => onUpdateQuantity(quantity + 1)}
          onDecrease={() => onUpdateQuantity(quantity - 1)}
        />

        <div className="mt-2">
          <PriceDisplay price={subtotal.toFixed(2)} variant="emphasis" size="lg" />
        </div>
      </div>
    </div>
  );
};
