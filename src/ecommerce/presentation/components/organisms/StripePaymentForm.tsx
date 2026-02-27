'use client';

import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Button from '@/src/shared/components/atoms/Button';
import ErrorMessage from '@/src/shared/components/atoms/ErrorMessage';
import { ApiError } from '@/src/shared/domain/ApiError';

interface StripePaymentFormProps {
  orderId: number;
  orderNumber: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  orderId,
  orderNumber,
  onSuccess,
  onError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/commandes?success=true&orderId=${orderId}`,
      },
    })
      .then(({ error: submitError }) => {
        if (submitError) {
          setError(submitError.message || 'Une erreur est survenue lors du paiement');
          onError(submitError.message || 'Une erreur est survenue lors du paiement');
        } else {
          onSuccess();
        }
      })
      .catch((err: ApiError) => {
        const errorMessage = err.message || 'Une erreur est survenue';
        setError(errorMessage);
        onError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border rounded-lg p-6 bg-white">
        <h3 className="text-xl font-bold mb-4">Paiement</h3>
        <p className="text-sm text-gray-600 mb-4">
          Commande #{orderNumber}
        </p>
        
        <div className="mb-6">
          <PaymentElement />
        </div>

        <ErrorMessage message={error} />

        <Button
          type="submit"
          disabled={!stripe || loading}
          className="w-full"
        >
          {loading ? 'Traitement du paiement...' : 'Payer maintenant'}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Paiement sécurisé par Stripe
        </p>
      </div>
    </form>
  );
};
