import React from 'react';
import { AuthGuard } from '@/src/shared/components/AuthGuard';
import { CheckoutForm } from '@/src/ecommerce/presentation/components/CheckoutForm';

export default function CheckoutPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Finaliser la commande</h1>
        <CheckoutForm />
      </div>
    </AuthGuard>
  );
}
