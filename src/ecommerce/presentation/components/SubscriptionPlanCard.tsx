'use client';

import React from 'react';
import Link from 'next/link';
import { SubscriptionPlan, BillingInterval, SubscriptionFormat } from '../../domain/entities/SubscriptionPlan';
import { Button } from '@/src/shared/components/ui';

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  onSubscribe: (planId: number) => void;
  loading?: boolean;
}

const intervalLabels: Record<BillingInterval, string> = {
  monthly: 'Mensuel',
  quarterly: 'Trimestriel',
  yearly: 'Annuel',
};

const formatLabels: Record<SubscriptionFormat, string> = {
  paper: 'Papier',
  digital: 'Numérique',
  both: 'Papier + Numérique',
};

export const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  plan,
  onSubscribe,
  loading,
}) => {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-gray-600">{plan.description}</p>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-red-600">{plan.price} €</span>
          <span className="text-gray-500">/ {intervalLabels[plan.billingInterval]}</span>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Format:</span>
          <span className="font-medium">{formatLabels[plan.format]}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Durée:</span>
          <span className="font-medium">{plan.durationInMonths} mois</span>
        </div>
      </div>

      <Button
        onClick={() => onSubscribe(plan.id)}
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Traitement...' : "S'abonner"}
      </Button>
    </div>
  );
};
