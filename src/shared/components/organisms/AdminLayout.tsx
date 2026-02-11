'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/src/auth/presentation/context/AuthContext';
import { canAccessAdmin } from '@/src/auth/utils/roleHelpers';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  // Vérification des droits d'accès
  if (!canAccessAdmin(user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Accès refusé</h1>
          <p className="text-gray-400">Vous n'avez pas les droits pour accéder à cette page.</p>
          <Link href="/" className="mt-4 inline-block text-red-500 hover:text-red-400">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/users', label: 'Utilisateurs', icon: '👥' },
    { href: '/admin/produits', label: 'Produits', icon: '🛍️' },
    { href: '/admin/categories', label: 'Catégories', icon: '📁' },
    { href: '/admin/commandes', label: 'Commandes', icon: '📦' },
    { href: '/admin/subscriptions', label: 'Abonnements', icon: '💳' },
    { href: '/admin/subscription-plans', label: 'Plans d\'abonnement', icon: '📋' },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Administration</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">{user?.email}</span>
              <Link href="/" className="text-sm text-red-500 hover:text-red-400">
                Retour au site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-red-900/30 text-red-400 font-medium border border-red-800'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export { AdminLayout };
