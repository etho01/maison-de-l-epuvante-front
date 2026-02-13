'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/auth/presentation/context/AuthContext';
import { useCreateOrderViewModel } from '../../hooks/orders';
import { Address } from '@/src/ecommerce/domain/entities/Order';
import Input from '@/src/shared/components/atoms/Input';
import Button from '@/src/shared/components/atoms/Button';
import ErrorMessage from '@/src/shared/components/atoms/ErrorMessage';
import { checkoutSchema, CheckoutFormData } from '../../schemas/ecommerceSchemas';

export const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const createOrderViewModel = useCreateOrderViewModel();
  const { user } = useAuth();

  const { loading, error: submitError } = createOrderViewModel.getState();

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

  const onSubmit = async (data: CheckoutFormData) => {
    console.log('Form data submitted:', data);

    const finalBillingAddress: Address = data.useSameAddress 
      ? (data.shippingAddress as Address)
      : (data.billingAddress as Address);

    const products = cart.items.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const success = await createOrderViewModel.checkout({
      shippingAddress: data.shippingAddress,
      billingAddress: finalBillingAddress,
      paymentMethod: 'card',
      customerNotes: data.customerNotes || undefined,
      products,
    });

    if (success) {
      clearCart();
      router.push('/commandes?success=true');
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ErrorMessage message={submitError} />

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
      <div className="border rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Notes (optionnel)</h3>
        <textarea
          className="w-full border rounded p-2"
          rows={4}
          placeholder="Instructions de livraison, remarques..."
          {...register('customerNotes')}
        />
        {errors.customerNotes && (
          <p className="text-red-500 text-sm mt-1">{errors.customerNotes.message}</p>
        )}
      </div>

      {/* Récapitulatif */}
      <div className="border rounded-lg p-6 ">
        <h3 className="text-xl font-bold mb-4">Récapitulatif</h3>
        <div className="space-y-2 mb-4">
          {cart.items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>{(item.product.price * item.quantity).toFixed(2)} €</span>
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

      <Button type="submit" disabled={isSubmitting || loading} className="w-full">
        {isSubmitting || loading ? 'Traitement...' : 'Payer la commande'}
      </Button>
    </form>
  );
};
