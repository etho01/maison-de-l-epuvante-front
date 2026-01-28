/**
 * Component: Change Password Form
 * Formulaire de changement de mot de passe
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema, type ChangePasswordFormData } from '../schemas/authSchemas';
import { PasswordInput, Button, ErrorMessage } from '@/src/shared/components/ui';

export default function ChangePasswordForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      setSubmitError(null);
      setSuccessMessage(null);

      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors du changement de mot de passe');
      }

      setSuccessMessage('Mot de passe modifié avec succès');
      reset();
    } catch (error: any) {
      setSubmitError(error.message || 'Erreur lors du changement de mot de passe');
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Changer le mot de passe</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ErrorMessage message={submitError} />
        
        {successMessage && (
          <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-md flex items-start gap-3">
            <span className="text-xl flex-shrink-0">✅</span>
            <div className="flex-1">{successMessage}</div>
          </div>
        )}

        <PasswordInput
          id="currentPassword"
          label="Mot de passe actuel"
          placeholder="••••••••"
          error={errors.currentPassword?.message}
          {...register('currentPassword')}
        />

        <PasswordInput
          id="newPassword"
          label="Nouveau mot de passe"
          placeholder="••••••••"
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />

        <div className="bg-red-900/20 border border-red-800 rounded-md p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-red-500">Exigences :</strong>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Minimum 6 caractères</li>
              <li>Au moins 1 majuscule</li>
              <li>Au moins 1 chiffre</li>
            </ul>
          </p>
        </div>

        <Button type="submit" isLoading={isSubmitting}>
          Changer le mot de passe
        </Button>
      </form>
    </div>
  );
}
