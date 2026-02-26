/**
 * Infrastructure: Symfony Auth Repository
 * Implémentation pour les appels serveur directs à Symfony
 * Utilisé dans les API Routes Next.js et le Layout serveur
 */

import { 
  IAuthRepository, 
  AuthResponse 
} from '../../domain/repositories/IAuthRepository';
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
