'use client';

import React, { useEffect, useState } from 'react';

interface Stats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  recentOrders: any[];
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des stats
    // TODO: Remplacer par de vrais appels API
    setTimeout(() => {
      setStats({
        totalUsers: 156,
        totalOrders: 342,
        totalProducts: 48,
        totalRevenue: 12450.50,
        recentOrders: [
          { id: '1', customer: 'Jean Dupont', amount: 45.99, status: 'completed' },
          { id: '2', customer: 'Marie Martin', amount: 89.50, status: 'pending' },
          { id: '3', customer: 'Pierre Durand', amount: 120.00, status: 'completed' },
        ],
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Chargement...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-950/30 border border-blue-900/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-400">Utilisateurs</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        <div className="bg-green-950/30 border border-green-900/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-400">Commandes</p>
              <p className="text-2xl font-bold text-white">{stats.totalOrders}</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </div>

        <div className="bg-purple-950/30 border border-purple-900/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-400">Produits</p>
              <p className="text-2xl font-bold text-white">{stats.totalProducts}</p>
            </div>
            <div className="text-4xl">🛍️</div>
          </div>
        </div>

        <div className="bg-yellow-950/30 border border-yellow-900/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-400">Revenu</p>
              <p className="text-2xl font-bold text-white">{stats.totalRevenue.toFixed(2)}€</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>
      </div>

      {/* Commandes récentes */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Commandes récentes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-950/50 divide-y divide-gray-800">
              {stats.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {order.amount.toFixed(2)}€
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status === 'completed' ? 'Complétée' : 'En attente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
