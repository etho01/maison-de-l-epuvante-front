'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateAdministratorViewModel, useUpdateAdministratorViewModel } from '../../hooks/administrators';
import { Administrator, CreateAdministratorData, UpdateAdministratorData } from '../../../domain/entities/Administrator';
import { Input, Button, Checkbox, ErrorMessage } from '@/src/shared/components/atoms';
import { FormSection, FormActions } from '@/src/shared/components/molecules';
import { createAdministratorSchema, updateAdministratorSchema, CreateAdministratorFormData, UpdateAdministratorFormData } from '../../schemas/authSchemas';

interface AdminAdministratorFormProps {
  administrator?: Administrator;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const AdminAdministratorForm: React.FC<AdminAdministratorFormProps> = ({ administrator, onSuccess, onCancel }) => {
  const createViewModel = useCreateAdministratorViewModel();
  const updateViewModel = useUpdateAdministratorViewModel();
  const { loading: createLoading, error: createError } = createViewModel.getState();
  const { loading: updateLoading, error: updateError } = updateViewModel.getState();
  
  const loading = createLoading || updateLoading;
  const error = createError || updateError;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAdministratorFormData | UpdateAdministratorFormData>({
    resolver: zodResolver(administrator ? updateAdministratorSchema : createAdministratorSchema),
    defaultValues: administrator ? {
      email: administrator.email,
      firstName: administrator.firstName,
      lastName: administrator.lastName,
      isVerified: administrator.isVerified,
      roles: administrator.roles,
    } : {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      isVerified: true,
      roles: [],
    },
  });

  const onSubmit = async (formData: CreateAdministratorFormData | UpdateAdministratorFormData) => {
    const data = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      isVerified: formData.isVerified,
      roles: formData.roles,
      ...('password' in formData && formData.password ? { password: formData.password } : {}),
    };

    const success = administrator 
      ? await updateViewModel.updateAdministrator(administrator.id, data)
      : await createViewModel.createAdministrator(data as CreateAdministratorData);
    
    if (success) {
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 border border-gray-700 text-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-red-500">
        {administrator ? 'Modifier l\'administrateur' : 'Nouvel administrateur'}
      </h2>

      <ErrorMessage message={error} />

      <FormSection 
        title="Informations personnelles"
        description="Informations de base de l'administrateur"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prénom *"
            type="text"
            error={errors.firstName?.message}
            variant="dark"
            {...register('firstName')}
          />

          <Input
            label="Nom *"
            type="text"
            error={errors.lastName?.message}
            variant="dark"
            {...register('lastName')}
          />
        </div>

        <Input
          label="Email *"
          type="email"
          error={errors.email?.message}
          variant="dark"
          {...register('email')}
        />

        {!administrator && (
          <Input
            label="Mot de passe *"
            type="password"
            error={'password' in errors ? errors.password?.message : undefined}
            variant="dark"
            {...register('password' as any)}
          />
        )}
      </FormSection>

      <FormSection title="Options">
        <Checkbox
          label="Compte vérifié"
          variant="dark"
          {...register('isVerified')}
        />
      </FormSection>

      <FormActions align="left">
        <Button
          type="submit"
          disabled={loading || isSubmitting}
          variant="primary"
        >
          {loading || isSubmitting ? 'Enregistrement...' : administrator ? 'Mettre à jour' : 'Créer'}
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
