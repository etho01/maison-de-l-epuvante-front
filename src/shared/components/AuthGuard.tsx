'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/auth/presentation/context/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, redirectTo }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      const redirect = redirectTo || '/auth/login';
      const currentPath = window.location.pathname;
      router.push(`${redirect}?redirect=${currentPath}`);
    }
  }, [user, router, redirectTo]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Chargement...</p>
      </div>
    );
  }

  return <>{children}</>;
};
