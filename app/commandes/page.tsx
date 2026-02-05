import React from 'react';
import { AuthGuard } from '@/src/shared/components/AuthGuard';
import { OrdersManager } from '@/src/ecommerce/presentation/components';
import { SymfonyOrderRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyOrderRepository';
import { GetOrdersUseCase } from '@/src/ecommerce/application/usecases';

const orderRepository = new SymfonyOrderRepository();
const getOrdersUseCase = new GetOrdersUseCase(orderRepository);

export default async function CommandesPage() {
  const initialOrderPagination = await getOrdersUseCase.execute();

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Mes Commandes</h1>
        <OrdersManager 
          initialPagination={initialOrderPagination.pagination}
          initialOrders={initialOrderPagination.member}
        />
      </div>
    </AuthGuard>
  );
}
