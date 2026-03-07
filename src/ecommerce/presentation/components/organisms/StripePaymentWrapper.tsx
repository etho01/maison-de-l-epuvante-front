'use client';

import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { StripePaymentForm } from './StripePaymentForm';

// Charger la clé publique Stripe depuis les variables d'environnement
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface StripePaymentWrapperProps {
  clientSecret: string;
  orderId: number;
  orderNumber: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const StripePaymentWrapper: React.FC<StripePaymentWrapperProps> = ({
  clientSecret,
  orderId,
  orderNumber,
  onSuccess,
  onError,
}) => {
  const [options, setOptions] = useState<StripeElementsOptions | null>(null);

  useEffect(() => {
    if (clientSecret) {
      setOptions({
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#dc2626',
            colorBackground: '#ffffff',
            colorText: '#1f2937',
            colorDanger: '#ef4444',
            fontFamily: 'system-ui, sans-serif',
            borderRadius: '8px',
          },
        },
      });
    }
  }, [clientSecret]);

  if (!options) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-400">Initialisation du paiement...</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripePaymentForm
        orderId={orderId}
        orderNumber={orderNumber}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
};
