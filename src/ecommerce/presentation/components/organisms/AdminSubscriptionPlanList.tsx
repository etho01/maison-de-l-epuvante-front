'use client';

import React, { useState } from 'react';
import { useGetSubscriptionPlansViewModel, useDeleteSubscriptionPlanViewModel } from '../../hooks/subscriptions';
import { SubscriptionPlan } from '../../../domain/entities/SubscriptionPlan';
import { Input, Select, Button } from '@/src/shared/components/atoms';
import { ConfirmModal } from '@/src/shared/components/molecules';
import { Pagination } from '@/src/shared/domain/Pagination';
import { PaginationComponent } from '@/src/shared/components/molecules/Pagination';

interface AdminSubscriptionPlanListProps {
  onEdit?: (plan: SubscriptionPlan) => void;
  initialPlans?: SubscriptionPlan[];
  initialPagination?: Pagination;
}

export const AdminSubscriptionPlanList: React.FC<AdminSubscriptionPlanListProps> = ({ onEdit, initialPlans, initialPagination }) => {
  const listViewModel = useGetSubscriptionPlansViewModel(initialPlans, initialPagination);
  const deleteViewModel = useDeleteSubscriptionPlanViewModel();
  const { plans, loading, error, pagination } = listViewModel.getState();
  const { loading: deleteLoading } = deleteViewModel.getState();

  const [planToDelete, setPlanToDelete] = useState<SubscriptionPlan | null>(null);

  const handleDeleteClick = (plan: SubscriptionPlan) => {
    setPlanToDelete(plan);
  };

  const handleConfirmDelete = async () => {
    if (!planToDelete) return;
    
    const success = await deleteViewModel.deletePlan(planToDelete.id);
    if (success) {
      setPlanToDelete(null);
      listViewModel.loadPlans();
    } else {
      const deleteError = deleteViewModel.getState().error;
      if (deleteError) alert(deleteError);
    }
  };

  const handleCancelDelete = () => {
    setPlanToDelete(null);
  };

  const handleFilterChange = (key: string, value: any) => {
    listViewModel.setFilters({ [key]: value });
  };

  if (loading && plans.length === 0) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600 py-8">{error}</div>;
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

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 bg-gray-900 p-4 rounded-lg shadow border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="text"
            placeholder="Rechercher par nom..."
            onChange={(e) => handleFilterChange('name', e.target.value || undefined)}
            variant="dark"
          />
          
          <Select
            onChange={(e) => handleFilterChange('format', e.target.value || undefined)}
            variant="dark"
          >
            <option value="">Tous les formats</option>
            <option value="paper">Papier</option>
            <option value="digital">Numérique</option>
            <option value="both">Papier + Numérique</option>
          </Select>
          
          <Select
            onChange={(e) => handleFilterChange('active', e.target.value === 'true' ? true : e.target.value === 'false' ? false : undefined)}
            variant="dark"
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
            className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      plan.active
                        ? 'bg-green-900 text-green-300 border border-green-700'
                        : 'bg-red-900 text-red-300 border border-red-700'
                    }`}
                  >
                    {plan.active ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-4">{plan.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 block">Prix</span>
                    <span className="text-white font-semibold">{plan.price} €</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Intervalle</span>
                    <span className="text-white font-semibold">{formatInterval(plan.billingInterval)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Durée</span>
                    <span className="text-white font-semibold">{plan.durationInMonths} mois</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Format</span>
                    <span className="text-white font-semibold">{formatFormat(plan.format)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <Button
                  onClick={() => onEdit?.(plan)}
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
        <div className="text-center py-8 text-gray-500">Aucun plan d'abonnement trouvé</div>
      )}

      <PaginationComponent
        pagination={initialPagination}
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
