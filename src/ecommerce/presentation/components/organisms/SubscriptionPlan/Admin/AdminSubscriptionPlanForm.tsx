'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateSubscriptionPlanViewModel, useUpdateSubscriptionPlanViewModel } from '../../../../hooks/subscriptions';
import { SubscriptionPlan, CreateSubscriptionPlanData, UpdateSubscriptionPlanData } from '../../../../../domain/entities/SubscriptionPlan';
import { Input, Select, TextArea, Button, Checkbox, ErrorMessage } from '@/src/shared/components/atoms';
import { FormSection, FormActions } from '@/src/shared/components/molecules';
import { subscriptionPlanSchema, SubscriptionPlanFormData } from '../../../../schemas/ecommerceSchemas';
import { ApiError } from '@/src/shared/domain/ApiError';
import { useRouter } from 'next/navigation';

interface AdminSubscriptionPlanFormProps {
  plan?: SubscriptionPlan;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const AdminSubscriptionPlanForm: React.FC<AdminSubscriptionPlanFormProps> = ({ plan, onSuccess, onCancel }) => {
  const createViewModel = useCreateSubscriptionPlanViewModel();
  const updateViewModel = useUpdateSubscriptionPlanViewModel();
  const { loading: createLoading } = createViewModel.getState();
  const { loading: updateLoading } = updateViewModel.getState();
  
  const loading = createLoading || updateLoading;
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const redirectToList = () => {
    router.push('/admin/subscription-plans');
  };

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

  const onSubmit = (formData: SubscriptionPlanFormData) => {
    setError(null);
    
    const data: CreateSubscriptionPlanData | UpdateSubscriptionPlanData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      billingInterval: formData.billingInterval,
      durationInMonths: formData.durationInMonths,
      format: formData.format,
      active: formData.active,
    };

    const promise = plan
      ? updateViewModel.updatePlan(plan.id, data)
      : createViewModel.createPlan(data as CreateSubscriptionPlanData);

    promise
      .then(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          redirectToList();
        }
      })
      .catch((err: ApiError) => {
        setError(err.message || 'Erreur lors de l\'enregistrement du plan d\'abonnement');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-effect border border-crimson-900/30 text-neutral-100 p-6 rounded-xl shadow-crimson-md space-y-6">
      <h2 className="text-2xl font-bold mb-4 bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">
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
          variant="default"
          {...register('name')}
        />

        <TextArea
          label="Description *"
          rows={4}
          error={errors.description?.message}
          variant="default"
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
            variant="default"
            {...register('price', { valueAsNumber: true })}
          />

          <Input
            label="Durée (mois) *"
            type="number"
            error={errors.durationInMonths?.message}
            variant="default"
            {...register('durationInMonths', { valueAsNumber: true })}
          />

          <Select
            label="Intervalle de facturation *"
            error={errors.billingInterval?.message}
            variant="default"
            {...register('billingInterval')}
          >
            <option value="monthly">Mensuel</option>
            <option value="quarterly">Trimestriel</option>
            <option value="yearly">Annuel</option>
          </Select>

          <Select
            label="Format *"
            error={errors.format?.message}
            variant="default"
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
        <Button
          type="button"
          onClick={onCancel || redirectToList}
          variant="secondary"
        >
          Annuler
        </Button>
      </FormActions>
    </form>
  );
};
