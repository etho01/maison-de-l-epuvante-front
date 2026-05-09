import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetSubscriptionPlanByIdUseCase } from '@/src/ecommerce/application/usecases/subscriptions/GetSubscriptionPlanByIdUseCase';
import { SymfonySubscriptionPlanRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionPlanRepository';
import NotFound from '@/src/shared/components/atoms/NotFound';
import { AdminSubscriptionPlanForm } from '@/src/ecommerce/presentation/components/organisms/SubscriptionPlan/Admin/AdminSubscriptionPlanForm';

const subscriptionPlanRepository = new SymfonySubscriptionPlanRepository();
const getSubscriptionPlanByIdUseCase = new GetSubscriptionPlanByIdUseCase(subscriptionPlanRepository);

interface PageProps {
  params: { id: string };
}

export default async function AdminSubscriptionPlanDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (id === 'new') {
    return (
      <AdminLayout>
        <AdminSubscriptionPlanForm />
      </AdminLayout>
    );
  }

  let plan;
  try {
    plan = await getSubscriptionPlanByIdUseCase.execute(parseInt(id));
  } catch {
    return <NotFound message="Plan d'abonnement non trouvé" />;
  }

  return (
    <AdminLayout>
      <AdminSubscriptionPlanForm
        plan={plan}
      />
    </AdminLayout>
  );
}
