'use client';

import React, { useState } from 'react';
import { AdminUserList } from '@/src/auth/presentation/components/organisms/AdminUserList';
import { AdminUserForm } from '@/src/auth/presentation/components/organisms/AdminUserForm';
import { User } from '@/src/auth/domain/entities/User';
import { Button } from '@/src/shared/components/atoms';

interface AdminUsersClientProps {
  initialUsers?: User[];
}

export default function AdminUsersClient({
  initialUsers = [],
}: AdminUsersClientProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingUser(undefined);
    window.location.reload();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">Gestion des Utilisateurs</h1>
        <Button
          onClick={() => setShowForm(true)}
          variant="primary"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nouvel utilisateur</span>
        </Button>
      </div>

      {showForm ? (
        <AdminUserForm
          user={editingUser}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <AdminUserList
          initialUsers={initialUsers}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
