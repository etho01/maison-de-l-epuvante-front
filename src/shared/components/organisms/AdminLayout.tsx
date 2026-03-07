'use client';

import React, { useState } from 'react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Vérification des droits d'accès
  if (!canAccessAdmin(user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
        <div className="text-center glass-effect border border-crimson-900/30 rounded-2xl p-8 max-w-md">
          <svg className="w-16 h-16 mx-auto mb-4 text-crimson-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-2xl font-bold text-neutral-100 mb-2">Accès refusé</h1>
          <p className="text-neutral-400 mb-6">Vous n'avez pas les droits pour accéder à cette page.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-crimson-600 text-white rounded-xl hover:bg-crimson-700 transition-all duration-200 shadow-crimson-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/users', label: 'Utilisateurs' },
    { href: '/admin/administrateurs', label: 'Administrateurs' },
    { href: '/admin/categories', label: 'Catégories' },
    { href: '/admin/produits', label: 'Produits' },
    { href: '/admin/commandes', label: 'Commandes' },
    { href: '/admin/livraisons', label: 'Livraisons' },
    { href: '/admin/subscriptions', label: 'Abonnements' },
    { href: '/admin/subscription-plans', label: 'Plans d\'abonnement' },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="glass-effect border-b border-crimson-900/30 shadow-crimson-lg sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Bouton menu hamburger mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-300 hover:text-crimson-400 transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-crimson-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              <h1 className="text-lg sm:text-2xl font-bold text-neutral-100">Admin</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="hidden sm:inline text-sm text-neutral-400 truncate max-w-[150px] md:max-w-none">{user?.email}</span>
              <Link href="/" className="text-xs sm:text-sm text-crimson-400 hover:text-crimson-300 transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Retour au site</span>
                <span className="sm:hidden">Site</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block lg:w-64 glass-effect border border-crimson-900/30 rounded-xl shadow-crimson-lg p-4 h-fit lg:sticky lg:top-24">
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-crimson-600 text-white shadow-crimson-sm font-medium'
                        : 'text-neutral-300 hover:bg-neutral-800/50 hover:text-crimson-400'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Sidebar - Mobile (collapsible) */}
          {isMobileMenuOpen && (
            <aside className="lg:hidden glass-effect border border-crimson-900/30 rounded-xl shadow-crimson-lg p-4">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-crimson-600 text-white shadow-crimson-sm font-medium'
                          : 'text-neutral-300 hover:bg-neutral-800/50 hover:text-crimson-400'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          )}

          {/* Main content */}
          <main className="flex-1 glass-effect border border-crimson-900/30 rounded-xl shadow-crimson-lg p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export { AdminLayout };

