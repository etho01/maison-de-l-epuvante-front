'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { Product } from '@/src/ecommerce/domain/entities/Product';
import Button from '@/src/shared/components/atoms/Button';

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
      {product.images && product.images.length > 0 && (
        <div className="mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover rounded"
          />
        </div>
      )}

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
        <span className="text-xl font-bold text-red-600">{product.price} €</span>
        {product.stock > 0 ? (
          <span className="text-sm text-green-600">En stock ({product.stock})</span>
        ) : (
          <span className="text-sm text-red-600">Rupture de stock</span>
        )}
      </div>

      {product.exclusiveOnline && (
        <div className="mb-3">
          <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
            Exclusivité en ligne
          </span>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="flex-1"
        >
          Ajouter au panier {quantity > 0 && `(${quantity})`}
        </Button>
        <Link href={`/produits/${product.slug}`}>
          <Button variant="secondary">Détails</Button>
        </Link>
      </div>
    </div>
  );
};
