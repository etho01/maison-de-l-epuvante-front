'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useEcommerce } from '../context/EcommerceContext';
import { Address } from '../../domain/entities/Order';
import { useAuth } from '@/src/auth/presentation/context/AuthContext';
import { Button, ErrorMessage, Input } from '@/src/shared/components/ui';

export const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { checkout } = useEcommerce();
  const { user } = useAuth();

  const [shippingAddress, setShippingAddress] = useState<Address>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'FR',
  });

  const [billingAddress, setBillingAddress] = useState<Address>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'FR',
  });

  const [useSameAddress, setUseSameAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [customerNotes, setCustomerNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const finalBillingAddress = useSameAddress ? shippingAddress : billingAddress;

      await checkout({
        shippingAddress,
        billingAddress: finalBillingAddress,
        paymentMethod,
        customerNotes: customerNotes || undefined,
      });

      clearCart();
      router.push('/commandes?success=true');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la commande');
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Votre panier est vide</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage message={error} />}

      {/* Adresse de livraison */}
      <div className="border rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Adresse de livraison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prénom"
            value={shippingAddress.firstName}
            onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
            required
          />
          <Input
            label="Nom"
            value={shippingAddress.lastName}
            onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
            required
          />
          <Input
            label="Adresse"
            value={shippingAddress.address}
            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
            required
            className="md:col-span-2"
          />
          <Input
            label="Ville"
            value={shippingAddress.city}
            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
            required
          />
          <Input
            label="Code postal"
            value={shippingAddress.postalCode}
            onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
            required
          />
          <Input
            label="Pays"
            value={shippingAddress.country}
            onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
            required
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* Adresse de facturation */}
      <div className="border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Adresse de facturation</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useSameAddress}
              onChange={(e) => setUseSameAddress(e.target.checked)}
            />
            <span className="text-sm">Identique à l'adresse de livraison</span>
          </label>
        </div>

        {!useSameAddress && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prénom"
              value={billingAddress.firstName}
              onChange={(e) => setBillingAddress({ ...billingAddress, firstName: e.target.value })}
              required
            />
            <Input
              label="Nom"
              value={billingAddress.lastName}
              onChange={(e) => setBillingAddress({ ...billingAddress, lastName: e.target.value })}
              required
            />
            <Input
              label="Adresse"
              value={billingAddress.address}
              onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
              required
              className="md:col-span-2"
            />
            <Input
              label="Ville"
              value={billingAddress.city}
              onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
              required
            />
            <Input
              label="Code postal"
              value={billingAddress.postalCode}
              onChange={(e) => setBillingAddress({ ...billingAddress, postalCode: e.target.value })}
              required
            />
            <Input
              label="Pays"
              value={billingAddress.country}
              onChange={(e) => setBillingAddress({ ...billingAddress, country: e.target.value })}
              required
              className="md:col-span-2"
            />
          </div>
        )}
      </div>

      {/* Méthode de paiement */}
      <div className="border rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Méthode de paiement</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Carte bancaire</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>PayPal</span>
          </label>
        </div>
      </div>

      {/* Notes */}
      <div className="border rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Notes (optionnel)</h3>
        <textarea
          className="w-full border rounded p-2"
          rows={4}
          placeholder="Instructions de livraison, remarques..."
          value={customerNotes}
          onChange={(e) => setCustomerNotes(e.target.value)}
        />
      </div>

      {/* Récapitulatif */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h3 className="text-xl font-bold mb-4">Récapitulatif</h3>
        <div className="space-y-2 mb-4">
          {cart.items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>{(parseFloat(item.product.price) * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-red-600">
              {cart.totalPrice.toFixed(2)} €
            </span>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Traitement...' : 'Confirmer la commande'}
      </Button>
    </form>
  );
};
