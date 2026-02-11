'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateSubscriptionPlanViewModel, useUpdateSubscriptionPlanViewModel } from '../../hooks/subscriptions';
import { SubscriptionPlan, CreateSubscriptionPlanData, UpdateSubscriptionPlanData } from '../../../domain/entities/SubscriptionPlan';
import { Input, Select, TextArea, Button, Checkbox, ErrorMessage } from '@/src/shared/components/atoms';
import { FormSection, FormActions } from '@/src/shared/components/molecules';
import { subscriptionPlanSchema, SubscriptionPlanFormData } from '../../schemas/ecommerceSchemas';

interface AdminSubscriptionPlanFormProps {
  plan?: SubscriptionPlan;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const AdminSubscriptionPlanForm: React.FC<AdminSubscriptionPlanFormProps> = ({ plan, onSuccess, onCancel }) => {
  const createViewModel = useCreateSubscriptionPlanViewModel();
  const updateViewModel = useUpdateSubscriptionPlanViewModel();
  const { loading: createLoading, error: createError } = createViewModel.getState();
  const { loading: updateLoading, error: updateError } = updateViewModel.getState();
  
  const loading = createLoading || updateLoading;
  const error = createError || updateError;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubscriptionPlanFormData>({
    resolver: zodResolver(subscriptionPlanSchema),
    defaultValues: {
      name: plan?.name || '',
      description: plan?.description || '',
      price: plan?.price || 0,
      billingInterval: plan?.billingInterval || 'monthly',
      durationInMonths: plan?.durationInMonths || 1,
      format: plan?.format || 'digital',
      active: plan?.active ?? true,
    },
  });

  const onSubmit = async (formData: SubscriptionPlanFormData) => {
    const data: CreateSubscriptionPlanData | UpdateSubscriptionPlanData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      billingInterval: formData.billingInterval,
      durationInMonths: formData.durationInMonths,
      format: formData.format,
      active: formData.active,
    };

    const success = plan 
      ? await updateViewModel.updatePlan(plan.id, data)
      : await createViewModel.createPlan(data as CreateSubscriptionPlanData);
    
    if (success) {
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 border border-gray-700 text-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-red-500">
        {plan ? 'Modifier le plan d\'abonnement' : 'Nouveau plan d\'abonnement'}
      </h2>

      <ErrorMessage message={error} />

      <FormSection 
        title="Informations générales"
        description="Informations de base du plan d'abonnement"
      >
        <Input
          label="Nom *"
          type="text"
          error={errors.name?.message}
          variant="dark"
          {...register('name')}
        />

        <TextArea
          label="Description *"
          rows={4}
          error={errors.description?.message}
          variant="dark"
          {...register('description')}
        />
      </FormSection>

      <FormSection 
        title="Tarification et durée"
        description="Configuration de la facturation et de la durée"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prix *"
            type="number"
            step="0.01"
            error={errors.price?.message}
            variant="dark"
            {...register('price', { valueAsNumber: true })}
          />

          <Input
            label="Durée (mois) *"
            type="number"
            error={errors.durationInMonths?.message}
            variant="dark"
            {...register('durationInMonths', { valueAsNumber: true })}
          />

          <Select
            label="Intervalle de facturation *"
            error={errors.billingInterval?.message}
            variant="dark"
            {...register('billingInterval')}
          >
            <option value="monthly">Mensuel</option>
            <option value="quarterly">Trimestriel</option>
            <option value="yearly">Annuel</option>
          </Select>

          <Select
            label="Format *"
            error={errors.format?.message}
            variant="dark"
            {...register('format')}
          >
            <option value="digital">Numérique</option>
            <option value="paper">Papier</option>
            <option value="both">Papier + Numérique</option>
          </Select>
        </div>
      </FormSection>

      <FormSection title="Options">
        <Checkbox
          label="Actif"
          variant="dark"
          {...register('active')}
        />
      </FormSection>

      <FormActions align="left">
        <Button
          type="submit"
          disabled={loading || isSubmitting}
          variant="primary"
        >
          {loading || isSubmitting ? 'Enregistrement...' : plan ? 'Mettre à jour' : 'Créer'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            variant="secondary"
          >
            Annuler
          </Button>
        )}
      </FormActions>
    </form>
  );
};
