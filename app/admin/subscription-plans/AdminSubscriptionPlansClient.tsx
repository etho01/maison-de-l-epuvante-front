'use client';

import React, { useState } from 'react';
import { AdminSubscriptionPlanList } from '@/src/ecommerce/presentation/components/organisms/AdminSubscriptionPlanList';
import { AdminSubscriptionPlanForm } from '@/src/ecommerce/presentation/components/organisms/AdminSubscriptionPlanForm';
import { SubscriptionPlan } from '@/src/ecommerce/domain/entities/SubscriptionPlan';
import { Pagination } from '@/src/shared/domain/Pagination';

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
        <h1 className="text-3xl font-bold">Gestion des Plans d'Abonnement</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Nouveau plan
        </button>
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
