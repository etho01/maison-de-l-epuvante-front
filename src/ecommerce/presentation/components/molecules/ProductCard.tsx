'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { Product } from '@/src/ecommerce/domain/entities/Product';
import Button from '@/src/shared/components/atoms/Button';
import { ProductImage } from '@/src/shared/components/molecules/ProductImage';
import { PriceDisplay } from '@/src/shared/components/atoms/PriceDisplay';
import { StockIndicator } from '@/src/shared/components/atoms/StockIndicator';
import { Badge } from '@/src/shared/components/atoms/Badge';
import { AddToCartButton } from '../atoms/AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <ProductImage
        src={product.images?.[0]}
        alt={product.name}
        size="xl"
        className="mb-4"
      />

      <div className="mb-2">
        <Link href={`/produits/${product.slug}`} className="hover:underline">
          <h3 className="text-lg font-bold">{product.name}</h3>
        </Link>
        {product.category && (
          <p className="text-sm text-gray-500">{product.category.name}</p>
        )}
      </div>

      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{product.description}</p>

      <div className="flex items-center justify-between mb-3">
        <PriceDisplay price={product.price} variant="emphasis" size="xl" />
        <StockIndicator stock={product.stock} />
      </div>

      {product.exclusiveOnline && (
        <div className="mb-3">
          <Badge variant="primary" size="sm">
            Exclusivité en ligne
          </Badge>
        </div>
      )}

      <div className="flex gap-2">
        <AddToCartButton
          onAdd={handleAddToCart}
          disabled={product.stock === 0}
          currentQuantity={quantity}
          className="flex-1"
        />
        <Link href={`/produits/${product.slug}`}>
          <Button variant="secondary">Détails</Button>
        </Link>
      </div>
    </div>
  );
};
