'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/src/shared/components/ui';
import { Card } from '@/src/shared/components/atoms/Card';
import { PriceDisplay } from '@/src/shared/components/atoms/PriceDisplay';
import { Badge } from '@/src/shared/components/atoms/Badge';
import { BillingInterval, SubscriptionFormat, SubscriptionPlan } from '@/src/ecommerce/domain/entities/SubscriptionPlan';
import { BILLING_INTERVAL_LABELS, SUBSCRIPTION_FORMAT_LABELS } from '@/src/ecommerce/domain/constants/subscriptionPlan';

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  onSubscribe: (planId: number) => void;
  loading?: boolean;
}

export const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  plan,
  onSubscribe,
  loading,
}) => {
  return (
    <Card variant="default" padding="lg" hoverable>
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-2 text-neutral-100">{plan.name}</h3>
        <p className="text-neutral-400">{plan.description}</p>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <PriceDisplay price={plan.price} variant="emphasis" size="xl" />
          <span className="text-neutral-400">/ {BILLING_INTERVAL_LABELS[plan.billingInterval]}</span>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-400">Format:</span>
          <Badge variant="info" size="sm">{SUBSCRIPTION_FORMAT_LABELS[plan.format]}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-400">Durée:</span>
          <span className="font-medium text-neutral-100">{plan.durationInMonths} mois</span>
        </div>
      </div>

      <Button
        onClick={() => onSubscribe(plan.id)}
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Traitement...' : "S'abonner"}
      </Button>
    </Card>
  );
};
