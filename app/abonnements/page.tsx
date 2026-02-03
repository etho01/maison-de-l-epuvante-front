import React from 'react';
import { SymfonySubscriptionPlanRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionPlanRepository';
import { GetSubscriptionPlansUseCase } from '@/src/ecommerce/application/usecases';
import { SubscriptionPlansView } from '@/src/ecommerce/presentation/components';

const subscriptionPlanRepository = new SymfonySubscriptionPlanRepository();
const getSubscriptionPlansUseCase = new GetSubscriptionPlansUseCase(subscriptionPlanRepository);

export default async function AbonnementsPage() {
  const planData = await getSubscriptionPlansUseCase.execute();
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Nos Abonnements</h1>
        <p className="text-gray-600 text-center mb-12">
          Choisissez l'abonnement qui vous convient pour recevoir régulièrement nos fanzines
        </p>

        <SubscriptionPlansView
          initialPlans={planData.member}
          initialPagination={planData.pagination}
        />
      </div>
    </div>
  );
}