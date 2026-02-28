'use client';

import React, { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/src/shared/components/atoms/LoadingSpinner';
import { Badge } from '@/src/shared/components/atoms/Badge';
import { DataTable, Column } from '@/src/shared/components/molecules/DataTable';

interface Stats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  recentOrders: RecentOrder[];
}

interface RecentOrder {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending';
}

const statCards = (stats: Stats) => [
  {
    label: 'Utilisateurs',
    value: stats.totalUsers,
    emoji: '👥',
    bg: 'bg-blue-950/30 border-blue-900/50',
    text: 'text-blue-400',
  },
  {
    label: 'Commandes',
    value: stats.totalOrders,
    emoji: '📦',
    bg: 'bg-green-950/30 border-green-900/50',
    text: 'text-green-400',
  },
  {
    label: 'Produits',
    value: stats.totalProducts,
    emoji: '🛍️',
    bg: 'bg-purple-950/30 border-purple-900/50',
    text: 'text-purple-400',
  },
  {
    label: 'Revenu',
    value: `${stats.totalRevenue.toFixed(2)} €`,
    emoji: '💰',
    bg: 'bg-yellow-950/30 border-yellow-900/50',
    text: 'text-yellow-400',
  },
];

const recentOrderColumns: Column<RecentOrder>[] = [
  {
    key: 'id',
    header: 'ID',
    render: (o) => <span className="text-gray-300 font-mono">#{o.id}</span>,
  },
  {
    key: 'customer',
    header: 'Client',
    render: (o) => <span className="text-gray-300">{o.customer}</span>,
  },
  {
    key: 'amount',
    header: 'Montant',
    render: (o) => <span className="text-gray-300">{o.amount.toFixed(2)} €</span>,
  },
  {
    key: 'status',
    header: 'Statut',
    render: (o) => (
      <Badge variant={o.status === 'completed' ? 'success' : 'warning'} size="xs">
        {o.status === 'completed' ? 'Complétée' : 'En attente'}
      </Badge>
    ),
  },
];

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
    // TODO: Remplacer par de vrais appels API
    setTimeout(() => {
      setStats({
        totalUsers: 156,
        totalOrders: 342,
        totalProducts: 48,
        totalRevenue: 12450.50,
        recentOrders: [
          { id: '1', customer: 'Jean Dupont',   amount: 45.99,  status: 'completed' },
          { id: '2', customer: 'Marie Martin',  amount: 89.50,  status: 'pending' },
          { id: '3', customer: 'Pierre Durand', amount: 120.00, status: 'completed' },
        ],
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" variant="white" label="Chargement du dashboard…" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards(stats).map((card) => (
          <div
            key={card.label}
            className={`border rounded-lg p-6 ${card.bg}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${card.text}`}>{card.label}</p>
                <p className="text-2xl font-bold text-white">{card.value}</p>
              </div>
              <div className="text-4xl" aria-hidden="true">{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Commandes récentes */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Commandes récentes</h3>
        <div className="bg-gray-950/50 rounded-lg overflow-hidden">
          <DataTable
            columns={recentOrderColumns}
            data={stats.recentOrders}
            keyExtractor={(o) => o.id}
            caption="Commandes récentes"
            className="border-gray-800"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

