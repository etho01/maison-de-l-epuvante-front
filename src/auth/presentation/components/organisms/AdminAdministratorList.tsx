'use client';

import React, { useState } from 'react';
import { useGetAllAdministratorsViewModel, useDeleteAdministratorViewModel } from '../../hooks/administrators';
import { Administrator } from '../../../domain/entities/Administrator';
import { Button } from '@/src/shared/components/atoms';
import { ConfirmModal } from '@/src/shared/components/molecules';
import { useRouter } from 'next/navigation';

interface AdminAdministratorListProps {
  initialAdministrators?: Administrator[];
}

export const AdminAdministratorList: React.FC<AdminAdministratorListProps> = ({ initialAdministrators }) => {
  const listViewModel = useGetAllAdministratorsViewModel(initialAdministrators);
  const deleteViewModel = useDeleteAdministratorViewModel();
  const { administrators, loading, error } = listViewModel.getState();
  const { loading: deleteLoading } = deleteViewModel.getState();

  const [adminToDelete, setAdminToDelete] = useState<Administrator | null>(null);

  const handleDeleteClick = (admin: Administrator) => {
    setAdminToDelete(admin);
  };

  const handleConfirmDelete = () => {
    if (!adminToDelete) return;
    
    deleteViewModel.deleteAdministrator(adminToDelete.id)
      .then((success) => {
        if (success) {
          setAdminToDelete(null);
          listViewModel.loadAdministrators();
        } else {
          const deleteError = deleteViewModel.getState().error;
          if (deleteError) alert(deleteError);
        }
      });
  };

  const handleCancelDelete = () => {
    setAdminToDelete(null);
  };

  if (loading && administrators.length === 0) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  const routeur = useRouter();

  const handleEdit = (admin: Administrator) => {
    routeur.push(`/admin/administrateurs/${admin.id}`);
  };

  if (error) {
    return (
      <div className="glass-effect border border-crimson-700/50 text-crimson-200 py-8 px-4 rounded-xl flex items-start justify-center gap-3">
        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div>
      {/* Administrators Table */}
      <div className="glass-effect border border-crimson-900/30 rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-crimson-900/30">
          <thead className="bg-neutral-900/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Rôles
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-neutral-950/30 divide-y divide-crimson-900/20">
            {administrators.map((admin: Administrator) => (
              <tr key={admin.id} className="hover:bg-neutral-800/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-100">
                    {admin.firstName} {admin.lastName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-300">{admin.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-1">
                    {admin.roles.map((role, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-semibold rounded-md bg-blue-950/50 text-blue-400 border border-blue-700/50"
                      >
                        {role.replace('ROLE_', '')}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-semibold ${
                      admin.isVerified
                        ? 'bg-green-950/50 text-green-400 border border-green-700/50'
                        : 'bg-yellow-950/50 text-yellow-400 border border-yellow-700/50'
                    }`}
                  >
                    {admin.isVerified ? 'Vérifié' : 'Non vérifié'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex gap-2 justify-end">
                    <Button
                      onClick={() => handleEdit(admin)}
                      variant="secondary"
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(admin)}
                      variant="danger"
                    >
                      Supprimer
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {administrators.length === 0 && (
        <div className="text-center py-8 text-neutral-400">Aucun administrateur trouvé</div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!adminToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Supprimer l'administrateur"
        message={`Êtes-vous sûr de vouloir supprimer l'administrateur "${adminToDelete?.firstName} ${adminToDelete?.lastName}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="danger"
        isLoading={deleteLoading}
      />
    </div>
  );
};
