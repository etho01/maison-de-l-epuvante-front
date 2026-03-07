'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '../../../context/CartContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/auth/presentation/context/AuthContext';
import { useCreateOrderViewModel } from '../../../hooks/orders';
import { Address, OrderError } from '@/src/ecommerce/domain/entities/Order';
import Input from '@/src/shared/components/atoms/Input';
import Button from '@/src/shared/components/atoms/Button';
import ErrorMessage from '@/src/shared/components/atoms/ErrorMessage';
import { checkoutSchema, CheckoutFormData } from '../../../schemas/ecommerceSchemas';
import { StripePaymentWrapper } from '../StripePaymentWrapper';
import { ApiError } from '@/src/shared/domain/ApiError';

export const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const createOrderViewModel = useCreateOrderViewModel();
  const { user } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { loading, clientSecret, orderId, orderNumber } = createOrderViewModel.getState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingAddress: {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        address: '',
        city: '',
        postalCode: '',
        country: 'FR',
      },
      billingAddress: {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        address: '',
        city: '',
        postalCode: '',
        country: 'FR',
      },
      customerNotes: '',
      useSameAddress: true,
    },
  });

  const useSameAddress = watch('useSameAddress');

  const onSubmit = (data: CheckoutFormData) => {
    setError(null);

    const finalBillingAddress: Address = data.useSameAddress 
      ? (data.shippingAddress as Address)
      : (data.billingAddress as Address);

    const products = cart.items.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));

    createOrderViewModel.checkout({
      shippingAddress: data.shippingAddress,
      billingAddress: finalBillingAddress,
      paymentMethod: 'card',
      customerNotes: data.customerNotes || undefined,
      products,
    })
      .then(() => {
        setShowPayment(true);
      })
      .catch((err: ApiError) => {
        let data = err.getData();
        if (err.hasError(OrderError.INVALID_QUANTITY)) {
          if (data['quantity'] < 0)
          {
            setError('La quantité du produit ' + data['productName'] + ' ne peut pas être négative.');
          }
          else if (data['quantity'] >= data['availableStock']) 
          {
            setError('Le produit ' + data['productName'] + ' est en rupture de stock. Quantité disponible : ' + data['availableStock']);
          }
        } else if (err.hasError(OrderError.ORDER_NOT_FOUND)) {
          setError('Le produit ' + data?.['productName'] + ' n\'existe pas.');
        } else {
          setError(err.message || 'Erreur lors de la création de la commande');
        }
      });
  };


  const handlePaymentSuccess = () => {
    clearCart();
    router.push('/commandes?success=true');
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
  };

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-400">Votre panier est vide</p>
      </div>
    );
  }

  // Afficher le formulaire de paiement Stripe après la création de la commande
  if (showPayment && clientSecret && orderId && orderNumber) {
    return (
      <div className="max-w-2xl mx-auto">
        <StripePaymentWrapper
          clientSecret={clientSecret}
          orderId={orderId}
          orderNumber={orderNumber}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ErrorMessage message={error} />

      {/* Adresse de livraison */}
      <div className="border rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Adresse de livraison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prénom"
            error={errors.shippingAddress?.firstName?.message}
            {...register('shippingAddress.firstName')}
          />
          <Input
            label="Nom"
            error={errors.shippingAddress?.lastName?.message}
            {...register('shippingAddress.lastName')}
          />
          <Input
            label="Adresse"
            error={errors.shippingAddress?.address?.message}
            className="md:col-span-2"
            {...register('shippingAddress.address')}
          />
          <Input
            label="Ville"
            error={errors.shippingAddress?.city?.message}
            {...register('shippingAddress.city')}
          />
          <Input
            label="Code postal"
            error={errors.shippingAddress?.postalCode?.message}
            {...register('shippingAddress.postalCode')}
          />
          <Input
            label="Pays"
            error={errors.shippingAddress?.country?.message}
            className="md:col-span-2"
            {...register('shippingAddress.country')}
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
              {...register('useSameAddress')}
            />
            <span className="text-sm">Identique à l'adresse de livraison</span>
          </label>
        </div>

        {!useSameAddress && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prénom"
              error={errors.billingAddress?.firstName?.message}
              {...register('billingAddress.firstName')}
            />
            <Input
              label="Nom"
              error={errors.billingAddress?.lastName?.message}
              {...register('billingAddress.lastName')}
            />
            <Input
              label="Adresse"
              error={errors.billingAddress?.address?.message}
              className="md:col-span-2"
              {...register('billingAddress.address')}
            />
            <Input
              label="Ville"
              error={errors.billingAddress?.city?.message}
              {...register('billingAddress.city')}
            />
            <Input
              label="Code postal"
              error={errors.billingAddress?.postalCode?.message}
              {...register('billingAddress.postalCode')}
            />
            <Input
              label="Pays"
              error={errors.billingAddress?.country?.message}
              className="md:col-span-2"
              {...register('billingAddress.country')}
            />
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="border border-neutral-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-neutral-100">Notes (optionnel)</h3>
        <textarea
          className="w-full border border-neutral-800 bg-neutral-950/30 text-neutral-100 rounded-lg p-2 focus:border-crimson-600 focus:outline-none focus:ring-1 focus:ring-crimson-600"
          rows={4}
          placeholder="Instructions de livraison, remarques..."
          {...register('customerNotes')}
        />
        {errors.customerNotes && (
          <p className="text-crimson-400 text-sm mt-1">{errors.customerNotes.message}</p>
        )}
      </div>

      {/* Récapitulatif */}
      <div className="border border-neutral-800 rounded-lg p-6 ">
        <h3 className="text-xl font-bold mb-4 text-neutral-100">Récapitulatif</h3>
        <div className="space-y-2 mb-4">
          {cart.items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span className="text-neutral-300">
                {item.product.name} x {item.quantity}
              </span>
              <span className="text-neutral-300">{(item.product.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
        </div>
        <div className="border-t border-neutral-800 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-neutral-100">Total:</span>
            <span className="text-2xl font-bold bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">
              {cart.totalPrice.toFixed(2)} €
            </span>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting || loading} className="w-full">
        {isSubmitting || loading ? 'Traitement...' : 'Payer la commande'}
      </Button>
    </form>
  );
};
