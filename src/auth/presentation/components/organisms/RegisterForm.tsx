/**
 * Component: Register Form
 * Formulaire d'inscription
 */

'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../../schemas/authSchemas';
import { Input, PasswordInput, Button, ErrorMessage, Link } from '@/src/shared/components/ui';
import { ApiError } from '@/src/shared/domain/ApiError';

export const RegisterForm = () => {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    setSubmitError(null);
    registerUser(
      data.email,
      data.password,
      data.firstName,
      data.lastName
    )
      .then(() => {
        router.push('/compte');
      })
      .catch((error: ApiError) => {
        setSubmitError(error.message || 'Erreur lors de l\'inscription');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark px-4 py-12">
      <div className="max-w-md w-full glass-effect border border-crimson-900/30 rounded-2xl shadow-crimson-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent mb-2">Inscription</h1>
          <p className="text-neutral-400">Rejoignez la communauté</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <ErrorMessage message={submitError} />

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              id="firstName"
              label="Prénom *"
              error={errors.firstName?.message}
              {...register('firstName')}
            />

            <Input
              type="text"
              id="lastName"
              label="Nom *"
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>

          <Input
            type="email"
            id="email"
            label="Email *"
            placeholder="votre@email.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <PasswordInput
            id="password"
            label="Mot de passe * (min. 6 caractères, 1 majuscule, 1 chiffre)"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <Button type="submit" isLoading={isSubmitting} fullWidth>
            S'inscrire
          </Button>

          <div className="text-center pt-4 border-t border-crimson-900/30">
            <span className="text-neutral-400 mr-2">Déjà un compte ?</span>
            <Link href="/auth/login" variant="primary">
              Se connecter
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
