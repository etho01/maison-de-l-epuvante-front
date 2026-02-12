'use client';

import React, { useState } from 'react';
import { useGetAllAdministratorsViewModel, useDeleteAdministratorViewModel } from '../../hooks/administrators';
import { Administrator } from '../../../domain/entities/Administrator';
import { Button } from '@/src/shared/components/atoms';
import { ConfirmModal } from '@/src/shared/components/molecules';

interface AdminAdministratorListProps {
  onEdit?: (administrator: Administrator) => void;
  initialAdministrators?: Administrator[];
}

export const AdminAdministratorList: React.FC<AdminAdministratorListProps> = ({ onEdit, initialAdministrators }) => {
  const listViewModel = useGetAllAdministratorsViewModel(initialAdministrators);
  const deleteViewModel = useDeleteAdministratorViewModel();
  const { administrators, loading, error } = listViewModel.getState();
  const { loading: deleteLoading } = deleteViewModel.getState();

  const [adminToDelete, setAdminToDelete] = useState<Administrator | null>(null);

  const handleDeleteClick = (admin: Administrator) => {
    setAdminToDelete(admin);
  };

  const handleConfirmDelete = async () => {
    if (!adminToDelete) return;
    
    const success = await deleteViewModel.deleteAdministrator(adminToDelete.id);
    if (success) {
      setAdminToDelete(null);
      listViewModel.loadAdministrators();
    } else {
      const deleteError = deleteViewModel.getState().error;
      if (deleteError) alert(deleteError);
    }
  };

  const handleCancelDelete = () => {
    setAdminToDelete(null);
  };

  if (loading && administrators.length === 0) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600 py-8">{error}</div>;
  }

  return (
    <div>
      {/* Administrators Table */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Rôles
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {administrators.map((admin: Administrator) => (
              <tr key={admin.id} className="hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">
                    {admin.firstName} {admin.lastName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{admin.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-1">
                    {admin.roles.map((role, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-900 text-blue-300 border border-blue-700"
                      >
                        {role.replace('ROLE_', '')}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      admin.isVerified
                        ? 'bg-green-900 text-green-300 border border-green-700'
                        : 'bg-yellow-900 text-yellow-300 border border-yellow-700'
                    }`}
                  >
                    {admin.isVerified ? 'Vérifié' : 'Non vérifié'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex gap-2 justify-end">
                    <Button
                      onClick={() => onEdit?.(admin)}
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
        <div className="text-center py-8 text-gray-500">Aucun administrateur trouvé</div>
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
