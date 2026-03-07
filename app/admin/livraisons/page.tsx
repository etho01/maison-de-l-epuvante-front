import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetDeliveriesUseCase } from '@/src/ecommerce/application/usecases/deliveries';
import { SymfonyDeliveryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyDeliveryRepository';
import { AdminDeliveryList } from '@/src/ecommerce/presentation/components/organisms/Delivery/Admin/AdminDeliveryList';

const deliveryRepository = new SymfonyDeliveryRepository();
const getDeliveriesUseCase = new GetDeliveriesUseCase(deliveryRepository);

export default async function AdminDeliveriesPage() {
  const deliveries = await getDeliveriesUseCase.execute(1);

  return (
    <AdminLayout>
      <AdminDeliveryList 
        initialDeliveries={deliveries.member}
        initialPagination={deliveries.pagination}
      />
    </AdminLayout>
  );
}
