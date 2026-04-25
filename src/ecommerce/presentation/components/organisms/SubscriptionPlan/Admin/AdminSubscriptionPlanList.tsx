'use client';

import React, { useState } from 'react';
import { useGetSubscriptionPlansViewModel, useDeleteSubscriptionPlanViewModel } from '../../../../hooks/subscriptions';
import { SubscriptionPlan } from '../../../../../domain/entities/SubscriptionPlan';
import { Input, Select, Button } from '@/src/shared/components/atoms';
import { ConfirmModal } from '@/src/shared/components/molecules';
import { Pagination } from '@/src/shared/domain/Pagination';
import { PaginationComponent } from '@/src/shared/components/molecules/Pagination';
import { ApiError } from '@/src/shared/domain/ApiError';
import { useRouter } from 'next/navigation';

interface AdminSubscriptionPlanListProps {
  initialPlans?: SubscriptionPlan[];
  initialPagination?: Pagination;
}

export const AdminSubscriptionPlanList: React.FC<AdminSubscriptionPlanListProps> = ({ initialPlans, initialPagination }) => {
  const listViewModel = useGetSubscriptionPlansViewModel(initialPlans, initialPagination);
  const deleteViewModel = useDeleteSubscriptionPlanViewModel();
  const { plans, loading, pagination } = listViewModel.getState();
  const { loading: deleteLoading } = deleteViewModel.getState();

  const [planToDelete, setPlanToDelete] = useState<SubscriptionPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteClick = (plan: SubscriptionPlan) => {
    setPlanToDelete(plan);
  };

  const handleConfirmDelete = () => {
    if (!planToDelete) return;
    
    setError(null);
    deleteViewModel.deletePlan(planToDelete.id)
      .then(() => {
        setPlanToDelete(null);
        listViewModel.loadPlans();
      })
      .catch((err: ApiError) => {
        setError(err.message || 'Erreur lors de la suppression du plan d\'abonnement');
      });
  };

  const handleCancelDelete = () => {
    setPlanToDelete(null);
  };

  const handleFilterChange = (key: string, value: any) => {
    listViewModel.setFilters({ [key]: value });
  };

  if (loading && plans.length === 0) {
    return <div className="text-center py-8 text-neutral-400">Chargement...</div>;
  }

  const formatInterval = (interval: string) => {
    const labels: { [key: string]: string } = {
      monthly: 'Mensuel',
      quarterly: 'Trimestriel',
      yearly: 'Annuel',
    };
    return labels[interval] || interval;
  };

  const formatFormat = (format: string) => {
    const labels: { [key: string]: string } = {
      paper: 'Papier',
      digital: 'Numérique',
      both: 'Papier + Numérique',
    };
    return labels[format] || format;
  };

  const setShowForm = (plan?: SubscriptionPlan) => {
    if (plan) {
      router.push(`/admin/subscription-plans/${plan.id}`);
    } else {
      router.push('/admin/subscription-plans/new');
    }
  }


  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">Gestion des Plans d'Abonnement</h1>
        <Button
          onClick={() => setShowForm(undefined)}
          variant="primary"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nouveau plan</span>
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 glass-effect border border-crimson-700/50 text-crimson-200 rounded-xl flex items-start gap-3">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      {/* Filters */}
      <div className="mb-6 glass-effect p-4 rounded-xl shadow-crimson-md border border-crimson-900/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="text"
            placeholder="Rechercher par nom..."
            onChange={(e) => handleFilterChange('name', e.target.value || undefined)}
            variant="default"
          />
          
          <Select
            onChange={(e) => handleFilterChange('format', e.target.value || undefined)}
            variant="default"
          >
            <option value="">Tous les formats</option>
            <option value="paper">Papier</option>
            <option value="digital">Numérique</option>
            <option value="both">Papier + Numérique</option>
          </Select>
          
          <Select
            onChange={(e) => handleFilterChange('active', e.target.value === 'true' ? true : e.target.value === 'false' ? false : undefined)}
            variant="default"
          >
            <option value="">Tous les statuts</option>
            <option value="true">Actif</option>
            <option value="false">Inactif</option>
          </Select>
          
          <Button
            onClick={() => listViewModel.setFilters({ page: 1 })}
            variant="secondary"
          >
            Réinitialiser
          </Button>
        </div>
      </div>

      {/* Plans List */}
      <div className="space-y-4 mb-6">
        {plans.map((plan: SubscriptionPlan) => (
          <div
            key={plan.id}
            className="glass-effect border border-crimson-900/30 p-6 rounded-xl shadow-crimson-md hover:border-crimson-700/50 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-neutral-100">{plan.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      plan.active
                        ? 'bg-green-950/50 text-green-300 border border-green-700/50'
                        : 'bg-crimson-950/50 text-crimson-300 border border-crimson-700/50'
                    }`}
                  >
                    {plan.active ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                
                <p className="text-neutral-400 mb-4">{plan.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-neutral-400 block">Prix</span>
                    <span className="text-neutral-100 font-semibold">{plan.price} €</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Intervalle</span>
                    <span className="text-neutral-100 font-semibold">{formatInterval(plan.billingInterval)}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Durée</span>
                    <span className="text-neutral-100 font-semibold">{plan.durationInMonths} mois</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Format</span>
                    <span className="text-neutral-100 font-semibold">{formatFormat(plan.format)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <Button
                  onClick={() => setShowForm(plan)}
                  variant="secondary"
                >
                  Modifier
                </Button>
                <Button
                  onClick={() => handleDeleteClick(plan)}
                  variant="danger"
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {plans.length === 0 && (
        <div className="text-center py-8 text-neutral-400">Aucun plan d'abonnement trouvé</div>
      )}

      <PaginationComponent
        pagination={pagination || undefined}
        onPageChange={(page: number) => listViewModel.setFilters({
          page
        })}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!planToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Supprimer le plan d'abonnement"
        message={`Êtes-vous sûr de vouloir supprimer le plan "${planToDelete?.name}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="danger"
        isLoading={deleteLoading}
      />
    </div>
  );
};
