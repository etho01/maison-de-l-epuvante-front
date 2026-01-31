'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/presentation/context/AuthContext';
import { useEcommerce } from '@/src/ecommerce/presentation/context/EcommerceContext';
import { SubscriptionPlanCard } from '@/src/ecommerce/presentation/components/SubscriptionPlanCard';
import { SubscriptionPlan } from '@/src/ecommerce/domain/entities/SubscriptionPlan';

export default function AbonnementsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { getSubscriptionPlans, subscribe } = useEcommerce();
  
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const plansData = await getSubscriptionPlans();
      setPlans(plansData.filter((plan) => plan.active));
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: number) => {
    if (!user) {
      router.push('/auth/login?redirect=/abonnements');
      return;
    }

    try {
      setSubscribing(true);
      setError(null);

      await subscribe({
        plan: `/api/subscription-plans/${planId}`,
        paymentMethod: 'card',
        autoRenew: true,
      });

      router.push('/compte?tab=abonnements&success=true');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Nos Abonnements</h1>
        <p className="text-gray-600 text-center mb-12">
          Choisissez l'abonnement qui vous convient pour recevoir régulièrement nos fanzines
        </p>

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
      </div>
    </div>
  );
}
