import { GetOrderByPaymentIntentIdUseCase, UpdateOrderStatusUseCase } from "@/src/ecommerce/application/usecases";
import { OrderStatusEnum } from "@/src/ecommerce/domain/entities/Order";
import { SymfonyOrderRepository } from "@/src/ecommerce/infrastructure/repositories/SymfonyOrderRepository";
import { OrderDetail } from "@/src/ecommerce/presentation/components";
import { AuthGuard } from "@/src/shared/components/AuthGuard";

interface CancelPageProps {
    searchParams: {
        session_id: string;
    };
}

const OrderRepository = new SymfonyOrderRepository();
const getOrderByPaymentIntentIdUseCase = new GetOrderByPaymentIntentIdUseCase(OrderRepository);
const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(OrderRepository);

export default async function CancelPage({ searchParams }: CancelPageProps) {
    const { session_id } = await searchParams;

    let order = undefined
    let error = null;
    try {
        order = await getOrderByPaymentIntentIdUseCase.execute(session_id);
        await updateOrderStatusUseCase.execute(order.id, OrderStatusEnum.CANCELLED);
        order.status = OrderStatusEnum.CANCELLED; // Met à jour le statut localement pour l'affichage
    } catch (error) {
        error = error instanceof Error ? error.message : 'Commande non trouvée';
    }

    return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {order ? <OrderDetail order={order} /> :
          <div className="text-center glass-effect border border-crimson-900/30 rounded-2xl p-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-crimson-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-crimson-400 text-lg mb-4">{error}</p>
            <a href="/commandes" className="text-crimson-400 hover:text-crimson-300 transition-colors inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Retour aux commandes</span>
            </a>
          </div>}
      </div>
    </AuthGuard>
    );
}