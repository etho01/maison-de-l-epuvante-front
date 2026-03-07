import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { AdminOrderDetail } from '@/src/ecommerce/presentation/components';
import { SymfonyOrderRepository } from '@/src/ecommerce/infrastructure/repositories';
import { GetOrderByIdUseCase } from '@/src/ecommerce/application/usecases/orders/GetOrderByIdUseCase';
import NotFound from '@/src/shared/components/atoms/NotFound';

interface PageProps {
  params: { id: string };
}

const symfonyOrderRepository = new SymfonyOrderRepository();
const getOrderByIdUseCase = new GetOrderByIdUseCase(symfonyOrderRepository);

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const orderId = parseInt(id, 10);

  try
  {
    const order = await getOrderByIdUseCase.execute(orderId);

    return (
      <AdminLayout>
        <AdminOrderDetail order={order} />
      </AdminLayout>
    );
  } catch (error) {
    return (
      <AdminLayout>
        <NotFound message="Commande non trouvée" />
      </AdminLayout>
    );
  }
}
