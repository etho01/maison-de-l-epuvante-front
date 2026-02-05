import React from 'react';
import { AuthGuard } from '@/src/shared/components/AuthGuard';
import { OrderDetail } from '@/src/ecommerce/presentation/components';

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const orderId = parseInt(params.id);

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <OrderDetail orderId={orderId} />
      </div>
    </AuthGuard>
  );
}
