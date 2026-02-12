'use client';

import React, { useState } from 'react';
import { AdminAdministratorList } from '@/src/auth/presentation/components/organisms/AdminAdministratorList';
import { AdminAdministratorForm } from '@/src/auth/presentation/components/organisms/AdminAdministratorForm';
import { Administrator } from '@/src/auth/domain/entities/Administrator';

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
        <h1 className="text-3xl font-bold">Gestion des Administrateurs</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Nouvel administrateur
        </button>
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
