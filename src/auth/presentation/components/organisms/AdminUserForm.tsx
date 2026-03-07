'use client';

import React, { useState, useEffect } from 'react';
import { User } from '../../../domain/entities/User';
import { Button, Input, Select } from '@/src/shared/components/atoms';

interface AdminUserFormProps {
  user?: User;
  onSuccess: () => void;
  onCancel: () => void;
}

const AVAILABLE_ROLES = [
  { value: 'ROLE_USER', label: 'Utilisateur' },
  { value: 'ROLE_ADMIN', label: 'Administrateur' },
  { value: 'ROLE_MODERATOR', label: 'Modérateur' },
];

export const AdminUserForm: React.FC<AdminUserFormProps> = ({ user, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    roles: [] as string[],
    isVerified: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        roles: user.roles,
        isVerified: user.isVerified,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // TODO: Implémenter l'appel API pour créer/modifier un utilisateur
      const url = user ? `/api/users/${user.id}` : '/api/users';
      const method = user ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde de l\'utilisateur');
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleToggle = (role: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  return (
    <div className="bg-neutral-900/50 border border-crimson-900/30 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-neutral-100 mb-6">
        {user ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-crimson-900/20 border border-crimson-700/50 text-crimson-200 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={loading || !!user}
          />

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Email vérifié
            </label>
            <input
              type="checkbox"
              checked={formData.isVerified}
              onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
              disabled={loading}
              className="w-5 h-5 rounded border-crimson-900/30 bg-neutral-900/50 text-crimson-500 focus:ring-2 focus:ring-crimson-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Prénom"
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            disabled={loading}
          />

          <Input
            label="Nom"
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Rôles
          </label>
          <div className="space-y-2">
            {AVAILABLE_ROLES.map((role) => (
              <label key={role.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.roles.includes(role.value)}
                  onChange={() => handleRoleToggle(role.value)}
                  disabled={loading}
                  className="rounded border-crimson-900/30 bg-neutral-900/50 text-crimson-500 focus:ring-2 focus:ring-crimson-500"
                />
                <span className="text-neutral-300">{role.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : user ? 'Modifier' : 'Créer'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Annuler
          </Button>
        </div>
      </form>

      <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-xl">
        <p className="text-yellow-300 text-sm">
          <strong>Note:</strong> Cette fonctionnalité nécessite un endpoint API backend pour la gestion des utilisateurs.
        </p>
      </div>
    </div>
  );
};
