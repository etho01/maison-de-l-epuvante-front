/**
 * Component: Reset Password Request Form
 * Formulaire de demande de réinitialisation de mot de passe
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordRequestSchema, type ResetPasswordRequestFormData } from '../schemas/authSchemas';
import { Input, Button, ErrorMessage, Link } from '@/src/shared/components/ui';

export default function ResetPasswordRequestForm() {
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordRequestFormData>({
    resolver: zodResolver(resetPasswordRequestSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ResetPasswordRequestFormData) => {
    try {
      setSubmitError(null);
      const response = await fetch('/api/auth/reset-password-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      setSuccess(true);
    } catch (error: any) {
      setSubmitError(error.message || 'Erreur lors de la demande');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-black px-4">
        <div className="max-w-md w-full bg-black border-2 border-red-700 rounded-lg shadow-2xl shadow-red-900/50 p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Email envoyé</h1>
            <p className="text-gray-400 mb-6">
              Un email de réinitialisation a été envoyé à votre adresse. Vérifiez votre boîte de réception.
            </p>
            <Link href="/auth/login" variant="ghost">
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-black px-4">
      <div className="max-w-md w-full bg-black border-2 border-red-700 rounded-lg shadow-2xl shadow-red-900/50 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Mot de passe oublié</h1>
          <p className="text-gray-400">Entrez votre email pour réinitialiser votre mot de passe</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ErrorMessage message={submitError} />

          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="votre@email.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Button type="submit" isLoading={isSubmitting} fullWidth>
            Envoyer le lien
          </Button>

          <div className="text-center pt-4 border-t border-red-900">
            <Link href="/auth/login" variant="primary">
              Retour à la connexion
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
