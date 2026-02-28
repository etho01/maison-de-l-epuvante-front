import React from 'react';
import { AuthGuard } from '@/src/shared/components/AuthGuard';
import { OrderDetail } from '@/src/ecommerce/presentation/components';
import { GetOrderByIdUseCase } from '@/src/ecommerce/application/usecases/orders/GetOrderByIdUseCase';
import { SymfonyOrderRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyOrderRepository';

interface OrderDetailPageProps {
  params: {
    id: number;
  };
}

const orderRepository = new SymfonyOrderRepository();
const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const {id} = await params;
  let order = undefined
  let error = null;
  try {
    order = await getOrderByIdUseCase.execute(id);
  } catch (error) {
    error = error instanceof Error ? error.message : 'Commande non trouvée';
  }

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {order ? <OrderDetail order={order} /> :
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <a href="/commandes" className="text-red-600 hover:underline">
              ← Retour aux commandes
            </a>
          </div>}
      </div>
    </AuthGuard>
  );
}
