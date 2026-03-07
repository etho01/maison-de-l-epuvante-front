/**
 * Component: Change Password Form
 * Formulaire de changement de mot de passe
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput, Button, ErrorMessage } from '@/src/shared/components/ui';
import { ChangePasswordFormData, changePasswordSchema } from '../../../schemas/authSchemas';
import { authContainer } from '@/src/auth/container';

const { changePasswordUseCase } = authContainer;

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
    setSubmitError(null);
    setSuccessMessage(null);

    try {
      await changePasswordUseCase.execute(data);
      setSuccessMessage('Mot de passe modifié avec succès');
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Erreur lors du changement de mot de passe'
      );
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-neutral-100 mb-6">Changer le mot de passe</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ErrorMessage message={submitError} />
        
        {successMessage && (
          <div className="glass-effect border border-green-700/50 bg-green-950/30 text-green-400 px-4 py-3 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
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

        <div className="glass-effect border border-crimson-700/50 bg-crimson-950/30 rounded-xl p-4">
          <div className="text-sm text-neutral-300">
            <strong className="text-crimson-400">Exigences :</strong>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Minimum 8 caractères</li>
              <li>Au moins 1 majuscule</li>
              <li>Au moins 1 chiffre</li>
            </ul>
          </div>
        </div>

        <Button type="submit" isLoading={isSubmitting}>
          Changer le mot de passe
        </Button>
      </form>
    </div>
  );
}
