'use client';

import React, { useState } from 'react';
import { AdminSubscriptionPlanList } from '@/src/ecommerce/presentation/components/organisms/SubscriptionPlan/Admin/AdminSubscriptionPlanList';
import { AdminSubscriptionPlanForm } from '@/src/ecommerce/presentation/components/organisms/SubscriptionPlan/Admin/AdminSubscriptionPlanForm';
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
        <h1 className="text-3xl font-bold bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">Gestion des Plans d'Abonnement</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-crimson-600 text-white rounded-xl hover:bg-crimson-700 transition-all duration-200 shadow-crimson-md flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nouveau plan</span>
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
