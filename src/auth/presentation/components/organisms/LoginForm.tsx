/**
 * Component: Login Form
 * Formulaire de connexion
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, PasswordInput, Button, ErrorMessage, Link } from '@/src/shared/components/ui';
import { LoginFormData, loginSchema } from '../../schemas/authSchemas';
import { useAuth } from '../../context/AuthContext';
import { ApiError } from '@/src/shared/domain/ApiError';

interface LoginFormProps {
  redirectUrl?: string;
}

export default function LoginForm({ redirectUrl }: LoginFormProps) {
  const { login } = useAuth();
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setSubmitError(null);
    login(data.email, data.password)
      .then(() => {
        router.push(redirectUrl || '/compte');
      })
      .catch((error: ApiError) => {
        setSubmitError(error.message || 'Erreur de connexion');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark px-4">
      <div className="max-w-md w-full glass-effect border border-crimson-900/30 rounded-2xl shadow-crimson-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent mb-2">Connexion</h1>
          <p className="text-neutral-400">Accédez à votre espace</p>
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

          <PasswordInput
            id="password"
            label="Mot de passe"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex items-center justify-between">
            <Link href="/auth/reset-password" variant="primary">
              Mot de passe oublié ?
            </Link>
          </div>

          <Button type="submit" isLoading={isSubmitting} fullWidth>
            Se connecter
          </Button>

          <div className="text-center pt-4 border-t border-crimson-900/30">
            <span className="text-neutral-400 mr-2">Pas encore de compte ?</span>
            <Link href="/auth/register" variant="primary">
              S'inscrire
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
