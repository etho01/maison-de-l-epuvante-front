import React from 'react';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetSubscriptionPlansUseCase } from '@/src/ecommerce/application/usecases/subscriptions';
import { SymfonySubscriptionPlanRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionPlanRepository';
import { AdminSubscriptionPlanList } from '@/src/ecommerce/presentation/components/organisms/SubscriptionPlan/Admin/AdminSubscriptionPlanList';

const subscriptionPlanRepository = new SymfonySubscriptionPlanRepository();
const getSubscriptionPlansUseCase = new GetSubscriptionPlansUseCase(subscriptionPlanRepository);

export default async function AdminSubscriptionPlansPage() {
  const plans = await getSubscriptionPlansUseCase.execute();

  return (
    <AdminLayout>
      <AdminSubscriptionPlanList
        initialPlans={plans.member}
        initialPagination={plans.pagination}
      />
    </AdminLayout>
  );
}
