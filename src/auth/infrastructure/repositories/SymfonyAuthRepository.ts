/**
 * Infrastructure: Symfony Auth Repository (SERVER-SIDE)
 *
 * ✅ À utiliser dans :
 *   - Les API Routes Next.js  (app/api/auth/**)
 *   - Les Server Components  (ex: app/compte/page.tsx)
 *   - Le layout serveur
 *
 * ❌ NE PAS utiliser dans :
 *   - Les composants 'use client'  → utiliser AuthRepositoryImpl
 *   - Les hooks de présentation   → utiliser AuthRepositoryImpl
 *
 * Fonctionnement : appelle directement l’API Symfony via serverApiClient
 * (dispose du cookie de session lors du rendu serveur).
 */

import { 
  IAuthRepository
} from '../../domain/repositories/IAuthRepository';
import { AuthResponse } from '../../domain/entities/AuthResponse';
import { 
  User, 
  LoginCredentials, 
  RegisterData,
  ChangePasswordData,
  ResetPasswordRequestData,
  ResetPasswordConfirmData,
  VerifyEmailData
} from '../../domain/entities/User';
import { UpdateUserData } from '../../domain/entities/UpdateUserData';
import { serverApiClient } from '@/src/shared/infrastructure/api/ServerApiClient';

export class SymfonyAuthRepository implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await serverApiClient.post<{ token: string; user: User }>(
      '/login',
      credentials
    );

    return {
      token: response.token,
      user: response.user,
    };
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await serverApiClient.post<{ token: string; user: User }>(
      '/users',
      data
    );
    return {
      token: response.token,
      user: response.user,
    };
  }

  async logout(): Promise<void> {
    // Logout géré uniquement côté Next.js (suppression cookie)
    // Pas besoin d'appel à Symfony
    return Promise.resolve();
  }

  async getCurrentUser(): Promise<User> {
    return await serverApiClient.get<User>('/me');
  }

  async updateUser(data: UpdateUserData): Promise<User> {
    return await serverApiClient.patch<User>('/me', data);
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    await serverApiClient.post('/change-password', data);
  }

  async requestPasswordReset(data: ResetPasswordRequestData): Promise<void> {
    await serverApiClient.post('/reset-password-request', data);
  }

  async confirmPasswordReset(data: ResetPasswordConfirmData): Promise<void> {
    await serverApiClient.post('/reset-password-confirm', data);
  }

  async verifyEmail(data: VerifyEmailData): Promise<void> {
    await serverApiClient.get(`/verify/email?token=${data.token}`);
  }

  async resendVerificationEmail(): Promise<void> {
    await serverApiClient.post('/verify/resend', {});
  }
}
