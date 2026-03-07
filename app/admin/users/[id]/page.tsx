import React from 'react';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string };
}

// Cette fonction simule la récupération d'un utilisateur
// TODO: Implémenter un vrai use case GetUserByIdUseCase avec un UserRepository
async function getUser(id: string) {
  try {
    // Pour l'instant, on simule avec des données mock
    // À remplacer par un vrai appel API quand le backend sera prêt
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/users/${id}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export default async function AdminUserDetailPage({ params }: PageProps) {
  const user = await getUser(params.id);

  if (!user) {
    notFound();
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-neutral-100 mb-6">
          Détails de l'utilisateur
        </h1>

        <div className="space-y-6">
          {/* Informations générales */}
          <div className="bg-neutral-900/50 border border-crimson-900/30 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-100 mb-4">Informations générales</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">ID</label>
                <p className="text-neutral-100">{user.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
                <p className="text-neutral-100">{user.email}</p>
              </div>
              {user.firstName && (
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Prénom</label>
                  <p className="text-neutral-100">{user.firstName}</p>
                </div>
              )}
              {user.lastName && (
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Nom</label>
                  <p className="text-neutral-100">{user.lastName}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Rôles</label>
                <div className="flex flex-wrap gap-2">
                  {user.roles?.map((role: string) => (
                    <span
                      key={role}
                      className="px-3 py-1 bg-crimson-900/30 border border-crimson-800/50 text-crimson-300 rounded-full text-sm"
                    >
                      {role}
                    </span>
                  )) || <span className="text-neutral-400">Aucun rôle</span>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Email vérifié</label>
                <p className="text-neutral-100">{user.isVerified ? 'Oui' : 'Non'}</p>
              </div>
              {user.createdAt && (
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Date de création</label>
                  <p className="text-neutral-100">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              )}
              {user.updatedAt && (
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Dernière mise à jour</label>
                  <p className="text-neutral-100">
                    {new Date(user.updatedAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Message d'information */}
          <div className="bg-yellow-900/20 border border-yellow-800/50 rounded-xl p-4">
            <p className="text-yellow-300 text-sm">
              <strong>Note:</strong> Cette page affiche les informations utilisateur. 
              Pour une implémentation complète, un endpoint API backend doit être créé pour récupérer les utilisateurs par ID.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
