/**
 * Component: Admin Users Client
 * Interface de gestion des utilisateurs
 */

'use client';

import { useState } from 'react';
import { User } from '@/src/auth/domain/entities/User';
import AdminLayout from '@/src/admin/components/AdminLayout';
import { Button, Input } from '@/src/shared/components/ui';

interface AdminUsersClientProps {
  user: User;
}

// Mock data - à remplacer par de vraies données de l'API
const mockUsers = [
  {
    id: '1',
    email: 'user1@example.com',
    firstName: 'Jean',
    lastName: 'Dupont',
    roles: ['ROLE_USER'],
    isVerified: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    email: 'admin@example.com',
    firstName: 'Marie',
    lastName: 'Martin',
    roles: ['ROLE_USER', 'ROLE_ADMIN'],
    isVerified: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    email: 'user2@example.com',
    firstName: 'Pierre',
    lastName: 'Durand',
    roles: ['ROLE_USER'],
    isVerified: false,
    createdAt: new Date('2024-01-20'),
  },
];

export default function AdminUsersClient({ user }: AdminUsersClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-red-600 mb-2">
              Gestion des utilisateurs
            </h1>
            <p className="text-gray-400">
              {users.length} utilisateurs au total
            </p>
          </div>
          <Button>
            <span className="mr-2">➕</span>
            Nouvel utilisateur
          </Button>
        </div>

        {/* Search */}
        <div className="bg-black border-2 border-red-700 rounded-lg p-6 shadow-xl shadow-red-900/30">
          <Input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Users Table */}
        <div className="bg-black border-2 border-red-700 rounded-lg shadow-xl shadow-red-900/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-900/20 border-b border-red-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-500">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-500">
                    Nom
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-500">
                    Rôle
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-500">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-500">
                    Créé le
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-red-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-900">
                {filteredUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-red-900/10 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-300">{u.email}</td>
                    <td className="px-6 py-4 text-gray-300">
                      {u.firstName} {u.lastName}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {u.roles.includes('ROLE_ADMIN') && (
                          <span className="px-2 py-1 bg-red-900/50 text-red-400 text-xs rounded-md border border-red-700">
                            Admin
                          </span>
                        )}
                        {u.roles.includes('ROLE_USER') && (
                          <span className="px-2 py-1 bg-gray-900/50 text-gray-400 text-xs rounded-md border border-gray-700">
                            User
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {u.isVerified ? (
                        <span className="px-2 py-1 bg-green-900/50 text-green-400 text-xs rounded-md border border-green-700">
                          Vérifié
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 text-xs rounded-md border border-yellow-700">
                          Non vérifié
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {u.createdAt.toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button className="text-blue-500 hover:text-blue-400 transition-colors">
                          ✏️
                        </button>
                        <button className="text-red-500 hover:text-red-400 transition-colors">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Aucun utilisateur trouvé</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
