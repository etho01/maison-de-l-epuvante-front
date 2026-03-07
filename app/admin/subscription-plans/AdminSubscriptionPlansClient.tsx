'use client';

import React, { useState } from 'react';
import { AdminSubscriptionPlanList } from '@/src/ecommerce/presentation/components/organisms/SubscriptionPlan/Admin/AdminSubscriptionPlanList';
import { AdminSubscriptionPlanForm } from '@/src/ecommerce/presentation/components/organisms/SubscriptionPlan/Admin/AdminSubscriptionPlanForm';
import { SubscriptionPlan } from '@/src/ecommerce/domain/entities/SubscriptionPlan';
import { Pagination } from '@/src/shared/domain/Pagination';
import { Button } from '@/src/shared/components/atoms';

interface AdminSubscriptionPlansClientProps {
  initialPlans?: SubscriptionPlan[];
  initialPagination?: Pagination;
}

export default function AdminSubscriptionPlansClient({
  initialPlans = [],
  initialPagination,
}: AdminSubscriptionPlansClientProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | undefined>();

  const handleEdit = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingPlan(undefined);
    window.location.reload();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPlan(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">Gestion des Plans d'Abonnement</h1>
        <Button
          onClick={() => setShowForm(true)}
          variant="primary"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nouveau plan</span>
        </Button>
      </div>

      {showForm ? (
        <AdminSubscriptionPlanForm
          plan={editingPlan}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <AdminSubscriptionPlanList
          initialPlans={initialPlans}
          initialPagination={initialPagination}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
