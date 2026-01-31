'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useEcommerce } from '@/src/ecommerce/presentation/context/EcommerceContext';
import { useCart } from '@/src/ecommerce/presentation/context/CartContext';
import { Product } from '@/src/ecommerce/domain/entities/Product';
import { Button } from '@/shared/components/ui/Button';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { getProducts } = useEcommerce();
  const { addToCart, getItemQuantity } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      // Rechercher le produit par slug
      const response = await getProducts({ name: slug });
      const foundProduct = response['hydra:member'].find((p) => p.slug === slug);
      
      if (!foundProduct) {
        setError('Produit non trouvé');
        return;
      }
      
      setProduct(foundProduct);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-96 rounded mb-4"></div>
          <div className="bg-gray-200 h-8 rounded mb-2"></div>
          <div className="bg-gray-200 h-4 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error || 'Produit non trouvé'}</p>
        </div>
      </div>
    );
  }

  const cartQuantity = getItemQuantity(product.id);

  return (
    <div className="container mx-auto px-4 py-8">
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
    </div>
  );
}
