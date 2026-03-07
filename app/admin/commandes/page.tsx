import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetOrdersUseCase } from '@/src/ecommerce/application/usecases/orders/GetOrdersUseCase';
import { SymfonyOrderRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyOrderRepository';
import { AdminOrderList } from '@/src/ecommerce/presentation/components/organisms/Order/Admin/AdminOrderList';

const orderRepository = new SymfonyOrderRepository();
const getOrdersUseCase = new GetOrdersUseCase(orderRepository);

export default async function AdminOrdersPage() {
  const orders = await getOrdersUseCase.execute({ page: 1 });

  return (
    <AdminLayout>
      <AdminOrderList 
        initialOrders={orders.member}
        initialPagination={orders.pagination}
      />
    </AdminLayout>
  );
}
