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
  price: number;
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
  const subtotal = product.price * quantity;

  return (
    <div className={`border border-crimson-900/30 rounded-xl p-4 flex gap-4 glass-effect hover:border-crimson-700/50 transition-all duration-200 ${className}`}>
      <ProductImage
        src={product.images?.[0]}
        alt={product.name}
        size="md"
      />

      <div className="flex-1">
        <Link href={`/produits/${product.slug}`} className="hover:text-crimson-400 transition-colors">
          <h3 className="font-bold text-neutral-100">{product.name}</h3>
        </Link>
        <div className="mt-2">
          <PriceDisplay price={product.price} variant="emphasis" />
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <button
          onClick={onRemove}
          className="text-crimson-400 hover:text-crimson-300 text-sm transition-colors flex items-center gap-1 group"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Supprimer</span>
        </button>

        <QuantitySelector
          quantity={quantity}
          min={1}
          max={product.stock}
          onIncrease={() => onUpdateQuantity(quantity + 1)}
          onDecrease={() => onUpdateQuantity(quantity - 1)}
        />

        <div className="mt-2">
          <PriceDisplay price={subtotal} variant="emphasis" size="lg" />
        </div>
      </div>
    </div>
  );
};
