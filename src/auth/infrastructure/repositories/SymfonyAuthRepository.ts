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
import { apiClient } from '../api/apiClient';

export class SymfonyAuthRepository implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<{ token: string; user: User }>(
      '/login',
      credentials
    );

    return {
      token: response.token,
      user: response.user,
    };
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<{ token: string; user: User }>(
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
    return await apiClient.get<User>('/me');
  }

  async updateUser(data: UpdateUserData): Promise<User> {
    return await apiClient.patch<User>('/me', data);
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    await apiClient.post('/change-password', data);
  }

  async requestPasswordReset(data: ResetPasswordRequestData): Promise<void> {
    await apiClient.post('/reset-password-request', data);
  }

  async confirmPasswordReset(data: ResetPasswordConfirmData): Promise<void> {
    await apiClient.post('/reset-password-confirm', data);
  }

  async verifyEmail(data: VerifyEmailData): Promise<void> {
    await apiClient.get(`/verify/email?token=${data.token}`);
  }

  async resendVerificationEmail(): Promise<void> {
    await apiClient.post('/verify/resend', {});
  }
}
