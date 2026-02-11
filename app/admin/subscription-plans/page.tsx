import React from 'react';
import AdminSubscriptionPlansClient from './AdminSubscriptionPlansClient';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetSubscriptionPlansUseCase } from '@/src/ecommerce/application/usecases/subscriptions';
import { SymfonySubscriptionRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionRepository';
import { SymfonySubscriptionPlanRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionPlanRepository';

const subscriptionPlanRepository = new SymfonySubscriptionPlanRepository();
const getSubscriptionPlansUseCase = new GetSubscriptionPlansUseCase(subscriptionPlanRepository);

export default async function AdminSubscriptionPlansPage() {
  const plans = await getSubscriptionPlansUseCase.execute();

  return (
    <AdminLayout>
      <AdminSubscriptionPlansClient 
        initialPlans={plans.member}
        initialPagination={plans.pagination}
      />
    </AdminLayout>
  );
}
