'use client';

import { User } from '@/src/auth/domain/entities/User';
import React, { useEffect, useState } from 'react';

const AdminUsersClient: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // TODO: Remplacer par le vrai appel API
      // const response = await fetch('/api/admin/users');
      // const data = await response.json();
      
      // Données de démonstration
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          roles: ['ADMIN'],
          isVerified: true,
          createdAt: new Date('2024-01-15'),
        },
        {
          id: '2',
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe',
          roles: ['USER'],
          isVerified: true,
          createdAt: new Date('2024-02-01'),
        },
        {
          id: '3',
          email: 'moderator@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          roles: ['MODERATOR'],
          isVerified: true,
          createdAt: new Date('2024-01-20'),
        },
      ];
      
      setUsers(mockUsers);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = async (userId: string, newRole: string) => {
    // TODO: Implémenter le changement de rôle via API
    console.log(`Changement de rôle pour l'utilisateur ${userId} vers ${newRole}`);
    alert('Fonctionnalité à implémenter: changement de rôle');
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      // TODO: Implémenter la suppression via API
      console.log(`Suppression de l'utilisateur ${userId}`);
      alert('Fonctionnalité à implémenter: suppression utilisateur');
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Chargement...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Gestion des utilisateurs</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Rôles
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Vérifié
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Inscrit le
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-950/50 divide-y divide-gray-800">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">
                    {user.firstName} {user.lastName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-1">
                    {user.roles.map((role) => (
                      <span
                        key={role}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          role === 'ADMIN'
                            ? 'bg-red-100 text-red-800'
                            : role === 'MODERATOR'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isVerified
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {user.isVerified ? 'Oui' : 'Non'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {user.createdAt?.toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleRoleChange(user.id, 'ADMIN')}
                    className="text-blue-400 hover:text-blue-300 mr-3"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Aucun utilisateur trouvé
        </div>
      )}
    </div>
  );
};

export default AdminUsersClient;
