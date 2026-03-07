'use client';

import React, { useState } from 'react';
import { AdminAdministratorList } from '@/src/auth/presentation/components/organisms/AdminAdministratorList';
import { AdminAdministratorForm } from '@/src/auth/presentation/components/organisms/AdminAdministratorForm';
import { Administrator } from '@/src/auth/domain/entities/Administrator';
import { Button } from '@/src/shared/components/atoms';

interface AdminAdministratorsClientProps {
  initialAdministrators?: Administrator[];
}

export default function AdminAdministratorsClient({
  initialAdministrators = [],
}: AdminAdministratorsClientProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingAdministrator, setEditingAdministrator] = useState<Administrator | undefined>();

  const handleEdit = (administrator: Administrator) => {
    setEditingAdministrator(administrator);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingAdministrator(undefined);
    window.location.reload();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAdministrator(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">Gestion des Administrateurs</h1>
        <Button
          onClick={() => setShowForm(true)}
          variant="primary"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nouvel administrateur</span>
        </Button>
      </div>

      {showForm ? (
        <AdminAdministratorForm
          administrator={editingAdministrator}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <AdminAdministratorList
          initialAdministrators={initialAdministrators}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
