'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/src/shared/components/ui';
import { useCart } from '../../context/CartContext';

export const CartSummary: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Votre panier est vide</p>
        <Link href="/produits">
          <Button>Continuer mes achats</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Mon Panier ({cart.totalItems} article{cart.totalItems > 1 ? 's' : ''})</h2>

      <div className="space-y-4 mb-6">
        {cart.items.map((item) => (
          <div key={item.product.id} className="border rounded-lg p-4 flex gap-4">
            {item.product.images && item.product.images[0] && (
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
              />
            )}

            <div className="flex-1">
              <Link href={`/produits/${item.product.slug}`} className="hover:underline">
                <h3 className="font-bold">{item.product.name}</h3>
              </Link>
              <p className="text-lg font-bold text-red-600 mt-2">{item.product.price} €</p>
            </div>

            <div className="flex flex-col justify-between items-end">
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Supprimer
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                  disabled={item.quantity >= item.product.stock}
                >
                  +
                </button>
              </div>

              <p className="font-bold mt-2">
                {(parseFloat(item.product.price) * item.quantity).toFixed(2)} €
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Total:</span>
          <span className="text-2xl font-bold text-red-600">
            {cart.totalPrice.toFixed(2)} €
          </span>
        </div>

        <div className="flex gap-4">
          <Link href="/produits" className="flex-1">
            <Button variant="secondary" className="w-full">
              Continuer mes achats
            </Button>
          </Link>
          <Link href="/panier/checkout" className="flex-1">
            <Button className="w-full">Passer la commande</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
