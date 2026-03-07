'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SubscriptionPlanCard } from '../../molecules/SubscriptionPlan/SubscriptionPlanCard';
import { useAuth } from '@/src/auth/presentation/context/AuthContext';
import { SubscriptionPlan } from '../../../../domain/entities/SubscriptionPlan';
import { Pagination } from '@/src/shared/domain/Pagination';
import { LoaderCard } from '@/src/shared/components/atoms/LoaderCard';
import { useGetSubscriptionPlansViewModel, useSubscribeViewModel } from '../../../hooks/subscriptions';
import { PaginationComponent } from '@/src/shared/components/molecules/Pagination';
import { ApiError } from '@/src/shared/domain/ApiError';

interface SubscriptionPlansViewProps {
  initialPlans?: SubscriptionPlan[];
  initialPagination?: Pagination;
}

export const SubscriptionPlansView: React.FC<SubscriptionPlansViewProps> = ({ initialPlans, initialPagination }) => {
  const router = useRouter();
  const { user } = useAuth();
  const plansViewModel = useGetSubscriptionPlansViewModel(initialPlans, initialPagination);
  const subscribeViewModel = useSubscribeViewModel();

  const { plans: allPlans, pagination, loading } = plansViewModel.getState();
  const { subscribing } = subscribeViewModel.getState();
  const [error, setError] = React.useState<string | null>(null);

  // Filtrer pour ne montrer que les plans actifs côté client
  const plans = allPlans.filter((plan) => plan.active);

  const handleSubscribe = (planId: number) => {
    if (!user) {
      router.push('/auth/login?redirect=/abonnements');
      return;
    }

    setError(null);
    subscribeViewModel.subscribeToPlan({
      plan: `/api/subscription-plans/${planId}`,
      paymentMethod: 'card',
      autoRenew: true,
    })
      .then(() => {
        router.push('/compte?tab=abonnements&success=true');
      })
      .catch((err: ApiError) => {
        setError(err.message || 'Erreur lors de l\'abonnement');
      });
  };

  return (
    <>
      {error && (
        <div className="glass-effect border border-crimson-700/50 text-crimson-200 px-4 py-3 rounded-xl mb-6 flex items-start gap-3">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoaderCard />
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-400 text-lg">Aucun abonnement disponible pour le moment</p>
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
            onPageChange={(page) => plansViewModel.loadPlans(page)}
          />
        </>
      )}
    </>
  );
};
