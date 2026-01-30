/**
 * Component: Admin Layout
 * Layout pour l'espace administrateur avec sidebar
 */

'use client';

import { ReactNode, useState } from 'react';
import { User } from '@/src/auth/domain/entities/User';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
  children: ReactNode;
  user: User;
}

interface MenuItem {
  href: string;
  icon: string;
  label: string;
}

const menuItems: MenuItem[] = [
  { href: '/admin', icon: '📊', label: 'Dashboard' },
  { href: '/admin/users', icon: '👥', label: 'Utilisateurs' },
  { href: '/admin/products', icon: '🎃', label: 'Produits' },
  { href: '/admin/orders', icon: '📦', label: 'Commandes' },
  { href: '/admin/categories', icon: '🗂️', label: 'Catégories' },
];

export default function AdminLayout({ children, user }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-black border-r-2 border-red-700 transition-all duration-300 z-40 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Header Sidebar */}
        <div className="p-4 border-b border-red-900">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <h2 className="text-xl font-bold text-red-600">Admin</h2>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              {isSidebarOpen ? '◀' : '▶'}
            </button>
          </div>
          {isSidebarOpen && (
            <p className="text-sm text-gray-400 mt-2">
              {user.firstName} {user.lastName}
            </p>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? 'bg-red-900/50 text-red-500 border border-red-700'
                    : 'text-gray-400 hover:bg-red-900/20 hover:text-red-500'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isSidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-red-900">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-400 hover:bg-red-900/20 hover:text-red-500 transition-colors"
          >
            <span className="text-xl">🏠</span>
            {isSidebarOpen && <span className="font-medium">Retour au site</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
