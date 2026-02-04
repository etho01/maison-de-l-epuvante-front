/**
 * Component: Account Client
 * Composant client pour la page compte
 */

'use client';

import { useState } from 'react';
import { User } from '@/src/auth/domain/entities/User';
import { Button } from '@/src/shared/components/ui';
import EditProfileForm from '@/src/auth/presentation/components/organisms/EditProfileForm';
import ChangePasswordForm from '@/src/auth/presentation/components/organisms/ChangePasswordForm';

interface AccountClientProps {
  initialUser: User;
}

type Tab = 'profile' | 'password';

export default function AccountClient({ initialUser }: AccountClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black border-2 border-red-700 rounded-lg shadow-2xl shadow-red-900/50">
          {/* Header */}
          <div className="border-b border-red-900 p-6">
            <h1 className="text-3xl font-bold text-red-600 mb-2">Mon Compte</h1>
            <p className="text-gray-400">
              Bienvenue, {initialUser.firstName} {initialUser.lastName}
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-red-900">
            <div className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Profil
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'password'
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-400 hover:text-gray-300'
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
