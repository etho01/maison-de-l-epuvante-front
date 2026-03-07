import React from 'react';
import AdminDeliveriesClient from './AdminDeliveriesClient';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetDeliveriesUseCase } from '@/src/ecommerce/application/usecases/deliveries';
import { SymfonyDeliveryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyDeliveryRepository';

const deliveryRepository = new SymfonyDeliveryRepository();
const getDeliveriesUseCase = new GetDeliveriesUseCase(deliveryRepository);

export default async function AdminDeliveriesPage() {
  const deliveries = await getDeliveriesUseCase.execute(1);

  return (
    <AdminLayout>
      <AdminDeliveriesClient 
        initialDeliveries={deliveries.member}
        initialPagination={deliveries.pagination}
      />
    </AdminLayout>
  );
}
