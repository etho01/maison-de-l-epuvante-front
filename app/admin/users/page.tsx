import React from 'react';
import AdminUsersClient from './AdminUsersClient';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { User } from '@/src/auth/domain/entities/User';

export default async function AdminUsersPage() {
  // TODO: Implémenter un vrai use case GetUsersUseCase quand le backend sera prêt
  // Pour l'instant, on passe des données vides
  const initialUsers: User[] = [];

  return (
    <AdminLayout>
      <AdminUsersClient initialUsers={initialUsers} />
    </AdminLayout>
  );
}
