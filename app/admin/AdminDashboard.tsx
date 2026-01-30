/**
 * Component: Admin Dashboard
 * Dashboard principal de l'espace admin
 */

'use client';

import { User } from '@/src/auth/domain/entities/User';
import AdminLayout from '@/src/admin/components/AdminLayout';

interface AdminDashboardProps {
  user: User;
}

interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const stats: StatCard[] = [
    { title: 'Utilisateurs', value: '156', icon: '👥', color: 'red' },
    { title: 'Produits', value: '89', icon: '🎃', color: 'orange' },
    { title: 'Commandes', value: '234', icon: '📦', color: 'purple' },
    { title: 'Revenus', value: '12 450 €', icon: '💰', color: 'green' },
  ];

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Tableau de bord
          </h1>
          <p className="text-gray-400">
            Bienvenue dans l'espace d'administration
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-black border-2 border-red-700 rounded-lg p-6 shadow-xl shadow-red-900/30"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{stat.icon}</span>
                <div
                  className={`w-12 h-12 rounded-full bg-${stat.color}-900/30 flex items-center justify-center`}
                >
                  <span className="text-2xl">📈</span>
                </div>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-red-500">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-black border-2 border-red-700 rounded-lg p-6 shadow-xl shadow-red-900/30">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-md transition-colors flex items-center gap-3">
              <span className="text-2xl">➕</span>
              <span>Ajouter un produit</span>
            </button>
            <button className="bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-md transition-colors flex items-center gap-3">
              <span className="text-2xl">👤</span>
              <span>Nouvel utilisateur</span>
            </button>
            <button className="bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-md transition-colors flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <span>Voir les rapports</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-black border-2 border-red-700 rounded-lg p-6 shadow-xl shadow-red-900/30">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Activité récente
          </h2>
          <div className="space-y-4">
            {[
              { action: 'Nouvelle commande', time: 'Il y a 5 minutes', icon: '📦' },
              { action: 'Nouvel utilisateur inscrit', time: 'Il y a 12 minutes', icon: '👤' },
              { action: 'Produit mis à jour', time: 'Il y a 1 heure', icon: '🎃' },
              { action: 'Commentaire modéré', time: 'Il y a 2 heures', icon: '💬' },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border border-red-900 rounded-md hover:bg-red-900/10 transition-colors"
              >
                <span className="text-3xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-gray-300 font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
