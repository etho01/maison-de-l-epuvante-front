'use client';

import React, { useState } from 'react';
import { Button } from '@/src/shared/components/ui';
import { Product } from '@/src/ecommerce/domain/entities/Product';
import { useCart } from '../../context/CartContext';

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
          <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Pas d'image</span>
          </div>
        )}
      </div>

      {/* Détails */}
      <div>
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        
        {product.category && (
          <p className="text-gray-600 mb-4">{product.category.name}</p>
        )}

        <div className="mb-6">
          <span className="text-4xl font-bold text-red-600">{product.price} €</span>
        </div>

        {product.stock > 0 ? (
          <p className="text-green-600 mb-4">
            En stock ({product.stock} disponible{product.stock > 1 ? 's' : ''})
          </p>
        ) : (
          <p className="text-red-600 mb-4">Rupture de stock</p>
        )}

        {product.exclusiveOnline && (
          <div className="mb-4">
            <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded">
              Exclusivité en ligne
            </span>
          </div>
        )}

        <div className="prose mb-6">
          <p className="text-gray-700">{product.description}</p>
        </div>

        {product.stock > 0 && (
          <div className="flex gap-4 mb-6">
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-6 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <Button onClick={handleAddToCart} className="flex-1">
              Ajouter au panier {cartQuantity > 0 && `(${cartQuantity} dans le panier)`}
            </Button>
          </div>
        )}

        {product.sku && (
          <p className="text-sm text-gray-500">Référence: {product.sku}</p>
        )}
      </div>
    </div>
  );
};
