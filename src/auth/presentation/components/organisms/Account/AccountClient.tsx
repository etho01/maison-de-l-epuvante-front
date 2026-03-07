/**
 * Component: Account Client
 * Composant client de la page compte
 *
 * ⚠️ Ce fichier appartient à src/auth/presentation/ — pas à app/.
 * app/compte/page.tsx l'importe d'ici.
 */

'use client';

import { useState } from 'react';
import { User } from '@/src/auth/domain/entities/User';
import EditProfileForm from './EditProfileForm';
import ChangePasswordForm from './ChangePasswordForm';

interface AccountClientProps {
  initialUser: User;
}

type Tab = 'profile' | 'password';

export default function AccountClient({ initialUser }: AccountClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  return (
    <div className="min-h-screen bg-gradient-dark py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-effect border border-crimson-900/30 rounded-2xl shadow-crimson-xl">
          {/* Header */}
          <div className="border-b border-crimson-900/30 p-6">
            <h1 className="text-3xl font-bold bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent mb-2">Mon Compte</h1>
            <p className="text-neutral-400">
              Bienvenue, {initialUser.firstName} {initialUser.lastName}
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-crimson-900/30">
            <div className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 font-medium transition-all duration-200 ${
                  activeTab === 'profile'
                    ? 'text-crimson-400 border-b-2 border-crimson-500'
                    : 'text-neutral-400 hover:text-neutral-300'
                }`}
              >
                Profil
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`px-6 py-4 font-medium transition-all duration-200 ${
                  activeTab === 'password'
                    ? 'text-crimson-400 border-b-2 border-crimson-500'
                    : 'text-neutral-400 hover:text-neutral-300'
                }`}
              >
                Mot de passe
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'profile' && <EditProfileForm user={initialUser} />}
            {activeTab === 'password' && <ChangePasswordForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
