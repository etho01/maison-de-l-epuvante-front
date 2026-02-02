'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/presentation/context/AuthContext';
import { useSubscriptionPlansViewModel } from '../hooks/useSubscriptionPlansViewModel';
import { useSubscribeViewModel } from '../hooks/useSubscribeViewModel';
import { SubscriptionPlanCard } from './SubscriptionPlanCard';

export const SubscriptionPlansView: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const plansViewModel = useSubscriptionPlansViewModel();
  const subscribeViewModel = useSubscribeViewModel();
  
  const { plans, loading, error } = plansViewModel.getState();
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
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-lg p-6 animate-pulse">
              <div className="bg-gray-200 h-8 rounded mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-12 rounded mb-4"></div>
              <div className="bg-gray-200 h-10 rounded"></div>
            </div>
          ))}
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun abonnement disponible pour le moment</p>
        </div>
      ) : (
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
      )}
    </>
  );
};
