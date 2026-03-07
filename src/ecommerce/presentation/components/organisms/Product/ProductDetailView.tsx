'use client';

import React, { useState } from 'react';
import { Button } from '@/src/shared/components/ui';
import { Product } from '@/src/ecommerce/domain/entities/Product';
import { useCart } from '../../../context/CartContext';

interface ProductDetailViewProps {
  product: Product
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const { addToCart, getItemQuantity } = useCart();
  
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const cartQuantity = getItemQuantity(product.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Images */}
      <div>
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-full h-96 bg-neutral-950/30 border border-neutral-800/50 rounded-lg flex items-center justify-center">
            <span className="text-neutral-400">Pas d'image</span>
          </div>
        )}
      </div>

      {/* Détails */}
      <div>
        <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">{product.name}</h1>
        
        {product.category && (
          <p className="text-neutral-400 mb-4">{product.category.name}</p>
        )}

        <div className="mb-6">
          <span className="text-4xl font-bold text-crimson-500">{product.price} €</span>
        </div>

        {product.stock > 0 ? (
          <p className="text-green-400 mb-4">
            En stock ({product.stock} disponible{product.stock > 1 ? 's' : ''})
          </p>
        ) : (
          <p className="text-crimson-400 mb-4">Rupture de stock</p>
        )}

        {product.exclusiveOnline && (
          <div className="mb-4">
            <span className="inline-block bg-crimson-950/50 text-crimson-300 border border-crimson-700/50 px-3 py-1 rounded-lg">
              Exclusivité en ligne
            </span>
          </div>
        )}

        <div className="prose mb-6">
          <p className="text-neutral-300">{product.description}</p>
        </div>

        {product.stock > 0 && (
          <div className="flex gap-4 mb-6">
            <div className="flex items-center border border-neutral-800 rounded-lg overflow-hidden">
              <Button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                variant="ghost"
                size="sm"
                className="px-4 py-2"
              >
                -
              </Button>
              <span className="px-6 py-2 text-neutral-100">{quantity}</span>
              <Button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                variant="ghost"
                size="sm"
                className="px-4 py-2"
              >
                +
              </Button>
            </div>

            <Button onClick={handleAddToCart} className="flex-1">
              Ajouter au panier {cartQuantity > 0 && `(${cartQuantity} dans le panier)`}
            </Button>
          </div>
        )}

        {product.sku && (
          <p className="text-sm text-neutral-400">Référence: {product.sku}</p>
        )}
      </div>
    </div>
  );
};
