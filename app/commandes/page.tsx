import React from 'react';
import { AuthGuard } from '@/src/shared/components/AuthGuard';
import { OrdersManager } from '@/src/ecommerce/presentation/components';

export default function CommandesPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Mes Commandes</h1>
        <OrdersManager />
      </div>
    </AuthGuard>
  );
}
