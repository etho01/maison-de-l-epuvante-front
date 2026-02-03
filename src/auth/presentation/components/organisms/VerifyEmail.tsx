/**
 * Component: Verify Email
 * Composant pour la vérification de l'email
 */

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Token de vérification manquant');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message || 'Email vérifié avec succès');
          
          // Redirection après 3 secondes
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Erreur lors de la vérification');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Erreur de connexion au serveur');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-black px-4">
      <div className="max-w-md w-full bg-black border-2 border-red-700 rounded-lg shadow-2xl shadow-red-900/50 p-8">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <div className="text-6xl mb-4">⏳</div>
              <h1 className="text-2xl font-bold text-red-600 mb-4">Vérification en cours...</h1>
              <p className="text-gray-400">Veuillez patienter</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-6xl mb-4">✅</div>
              <h1 className="text-2xl font-bold text-green-600 mb-4">Email vérifié !</h1>
              <p className="text-gray-400 mb-4">{message}</p>
              <p className="text-gray-500 text-sm">Redirection automatique...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="text-6xl mb-4">❌</div>
              <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
              <p className="text-gray-400 mb-6">{message}</p>
              <Link
                href="/auth/login"
                className="inline-block bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md transition-colors"
              >
                Retour à la connexion
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
