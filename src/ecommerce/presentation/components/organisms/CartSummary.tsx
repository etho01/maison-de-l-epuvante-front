'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/src/shared/components/ui';
import { useCart } from '../../context/CartContext';
import { CartItem } from '@/src/shared/components/molecules/CartItem';
import { PriceDisplay } from '@/src/shared/components/atoms/PriceDisplay';

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
          <CartItem
            key={item.product.id}
            product={{
              id: item.product.id,
              name: item.product.name,
              slug: item.product.slug,
              price: item.product.price,
              images: item.product.images,
              stock: item.product.stock,
            }}
            quantity={item.quantity}
            onRemove={() => removeFromCart(item.product.id)}
            onUpdateQuantity={(newQuantity) => updateQuantity(item.product.id, newQuantity)}
          />
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Total:</span>
          <PriceDisplay price={cart.totalPrice.toFixed(2)} variant="emphasis" size="xl" />
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
