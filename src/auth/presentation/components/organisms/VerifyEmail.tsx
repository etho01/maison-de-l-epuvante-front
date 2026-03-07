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

    const verifyEmail = () => {
      fetch(`/api/auth/verify-email?token=${token}`)
        .then((response) => {
          return response.json().then((data) => ({ response, data }));
        })
        .then(({ response, data }) => {
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
        })
        .catch(() => {
          setStatus('error');
          setMessage('Erreur de connexion au serveur');
        });
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark px-4">
      <div className="max-w-md w-full glass-effect border border-crimson-900/30 rounded-2xl shadow-crimson-xl p-8">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4">
                <svg className="animate-spin text-crimson-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-neutral-100 mb-4">Vérification en cours...</h1>
              <p className="text-neutral-400">Veuillez patienter</p>
            </>
          )}

          {status === 'success' && (
            <>
              <svg className="w-16 h-16 mx-auto mb-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h1 className="text-2xl font-bold text-green-400 mb-4">Email vérifié !</h1>
              <p className="text-neutral-400 mb-4">{message}</p>
              <p className="text-neutral-500 text-sm">Redirection automatique...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <svg className="w-16 h-16 mx-auto mb-4 text-crimson-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <h1 className="text-2xl font-bold text-crimson-400 mb-4">Erreur</h1>
              <p className="text-neutral-400 mb-6">{message}</p>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-crimson-600 hover:bg-crimson-700 text-white font-bold rounded-xl transition-all duration-200 shadow-crimson-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Retour à la connexion</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
