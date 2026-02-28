/**
 * Presentation: Auth Context
 * Context React pour gérer l'état d'authentification globalement
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../../domain/entities/User';
import { authContainer } from '@/src/auth/container';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const { loginUseCase, registerUseCase, getCurrentUserUseCase, logoutUseCase, repository } = authContainer;

export function AuthProvider({ 
  children,
  initialUser = null 
}: { 
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(!initialUser);

  // Charger l'utilisateur au démarrage seulement si pas d'initialUser
  useEffect(() => {
    if (!initialUser) {
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, [initialUser]);

  const loadUser = async () => {
    try {
      const currentUser = await getCurrentUserUseCase.execute();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await loginUseCase.execute({ email, password });
    await refreshUser(); // Recharger les données de l'utilisateur après connexion
  };

  const register = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => {
    const response = await registerUseCase.execute({
      email,
      password,
      firstName,
      lastName,
    });
    refreshUser(); // Recharger les données de l'utilisateur après inscription
  };

  const logout = async () => {
    await logoutUseCase.execute();
    setUser(null);
  };

  const refreshUser = async () => {
    await loadUser();
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
