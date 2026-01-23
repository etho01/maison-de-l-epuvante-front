/**
 * Presentation: Auth Context
 * Context React pour gérer l'état d'authentification globalement
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { GetCurrentUserUseCase } from '../../application/usecases/GetCurrentUserUseCase';
import { AuthRepositoryImpl } from '../../infrastructure/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../../application/usecases/LoginUseCase';
import { RegisterUseCase } from '../../application/usecases/RegisterUseCase';
import { User } from '../../domain/entities/User';

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

// Initialisation des use cases
const authRepository = new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);

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
    setUser(response.user);
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
    setUser(response.user);
  };

  const logout = async () => {
    await authRepository.logout();
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
