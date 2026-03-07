'use client';

import React, { useState } from 'react';
import { User } from '../../../domain/entities/User';
import { Button } from '@/src/shared/components/atoms';

interface AdminUserListProps {
  initialUsers?: User[];
  onEdit?: (user: User) => void;
}

export const AdminUserList: React.FC<AdminUserListProps> = ({ 
  initialUsers = [], 
  onEdit 
}) => {
  const [users] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (userId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      // TODO: Implémenter la suppression via API
      alert('Fonctionnalité à implémenter: suppression utilisateur');
    }
  };

  if (users.length === 0) {
    return (
      <div className="bg-neutral-900/50 border border-crimson-900/30 rounded-xl p-8 text-center">
        <p className="text-neutral-400">Aucun utilisateur trouvé</p>
        <p className="text-sm text-yellow-400 mt-2">
          La gestion des utilisateurs nécessite un endpoint API backend.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-neutral-900/50 border border-crimson-900/30 text-neutral-200 placeholder-neutral-500 rounded-xl focus:ring-2 focus:ring-crimson-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-crimson-900/30">
          <thead className="bg-neutral-900/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Rôles
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Vérifié
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Inscrit le
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-neutral-950/30 divide-y divide-crimson-900/20">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-neutral-800/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-100">
                    {user.firstName} {user.lastName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-300">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-1">
                    {user.roles.map((role) => (
                      <span
                        key={role}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-md ${
                          role === 'ADMIN' || role === 'ROLE_ADMIN'
                            ? 'bg-crimson-950/50 text-crimson-400 border border-crimson-700/50'
                            : role === 'MODERATOR' || role === 'ROLE_MODERATOR'
                            ? 'bg-blue-950/50 text-blue-400 border border-blue-700/50'
                            : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                        }`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-md ${
                      user.isVerified
                        ? 'bg-green-950/50 text-green-400 border border-green-700/50'
                        : 'bg-yellow-950/50 text-yellow-400 border border-yellow-700/50'
                    }`}
                  >
                    {user.isVerified ? 'Oui' : 'Non'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    {onEdit && (
                      <Button
                        onClick={() => onEdit(user)}
                        variant="secondary"
                        size="sm"
                      >
                        Modifier
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(user.id)}
                      variant="danger"
                      size="sm"
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

      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-neutral-400">
          Aucun utilisateur trouvé
        </div>
      )}
    </div>
  );
};
