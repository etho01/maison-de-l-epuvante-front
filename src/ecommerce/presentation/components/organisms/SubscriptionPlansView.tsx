'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SubscriptionPlanCard } from '../molecules/SubscriptionPlanCard';
import { useAuth } from '@/src/auth/presentation/context/AuthContext';
import { SubscriptionPlan } from '../../../domain/entities/SubscriptionPlan';
import { Pagination } from '@/src/shared/domain/Pagination';
import { LoaderCard } from '@/src/shared/components/atoms/LoaderCard';
import { useSubscriptionPlansViewModel } from '../../hooks/useSubscriptionPlansViewModel';
import { useSubscribeViewModel } from '../../hooks/useSubscribeViewModel';
import { PaginationComponent } from '@/src/shared/components/molecules/Pagination';

interface SubscriptionPlansViewProps {
  initialPlans?: SubscriptionPlan[];
  initialPagination?: Pagination;
}

export const SubscriptionPlansView: React.FC<SubscriptionPlansViewProps> = ({ initialPlans, initialPagination }) => {
  const router = useRouter();
  const { user } = useAuth();
  const plansViewModel = useSubscriptionPlansViewModel(initialPlans, initialPagination);
  const subscribeViewModel = useSubscribeViewModel();

  const { plans, pagination, loading, error } = plansViewModel.getState();
  const { subscribing } = subscribeViewModel.getState();

  const handleSubscribe = async (planId: number) => {
    if (!user) {
      router.push('/auth/login?redirect=/abonnements');
      return;
    }

    const success = await subscribeViewModel.subscribeToPlan({
      plan: `/api/subscription-plans/${planId}`,
      paymentMethod: 'card',
      autoRenew: true,
    });

    if (success) {
      router.push('/compte?tab=abonnements&success=true');
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoaderCard />
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun abonnement disponible pour le moment</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <SubscriptionPlanCard
                key={plan.id}
                plan={plan}
                onSubscribe={handleSubscribe}
                loading={subscribing}
              />
            ))}
          </div>
          <PaginationComponent
            pagination={pagination !}
            onPageChange={(page) => plansViewModel.setFilter('page', page)}
          />
        </>
      )}
    </>
  );
};
