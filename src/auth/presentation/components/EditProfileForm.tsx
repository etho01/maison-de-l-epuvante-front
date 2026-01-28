/**
 * Component: Edit Profile Form
 * Formulaire de modification du profil utilisateur
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema, type UpdateProfileFormData } from '../schemas/updateProfileSchema';
import { User } from '@/src/auth/domain/entities/User';
import { Input, Button, ErrorMessage } from '@/src/shared/components/ui';
import { useAuth } from '../context/AuthContext';

interface EditProfileFormProps {
  user: User;
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      setSubmitError(null);
      setSuccessMessage(null);

      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la mise à jour');
      }

      setSuccessMessage('Profil mis à jour avec succès');
      
      // Rafraîchir les données utilisateur
      await refreshUser();
      router.refresh();
    } catch (error: any) {
      setSubmitError(error.message || 'Erreur lors de la mise à jour du profil');
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Informations personnelles</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ErrorMessage message={submitError} />
        
        {successMessage && (
          <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-md flex items-start gap-3">
            <span className="text-xl flex-shrink-0">✅</span>
            <div className="flex-1">{successMessage}</div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            id="firstName"
            label="Prénom"
            error={errors.firstName?.message}
            {...register('firstName')}
          />

          <Input
            type="text"
            id="lastName"
            label="Nom"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>

        <Input
          type="email"
          id="email"
          label="Email"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="flex gap-4">
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={!isDirty}
          >
            Enregistrer les modifications
          </Button>
          
          {isDirty && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.refresh()}
            >
              Annuler
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
