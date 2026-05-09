import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetDeliveryByIdUseCase } from '@/src/ecommerce/application/usecases/deliveries/GetDeliveryByIdUseCase';
import { SymfonyDeliveryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyDeliveryRepository';
import { AdminDeliveryDetail } from '@/src/ecommerce/presentation/components/organisms/Delivery/Admin/AdminDeliveryDetail';
import NotFound from '@/src/shared/components/atoms/NotFound';

interface PageProps {
  params: { id: string };
}

const symphonyDeliveryRepository = new SymfonyDeliveryRepository();
const getDeliveryByIdUseCase = new GetDeliveryByIdUseCase(symphonyDeliveryRepository);

export default async function AdminDeliveryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const deliveryId = Number.parseInt(id, 10);

  let delivery;
  try {
    delivery = await getDeliveryByIdUseCase.execute(deliveryId);
  } catch {
    // delivery remains undefined
  }

  if (!delivery) {
    return (
      <AdminLayout>
        <NotFound message="Livraison non trouvée" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminDeliveryDetail
          delivery={delivery}
      />
    </AdminLayout>
  );
}
