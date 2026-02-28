/**
 * Infrastructure: Auth Repository Implementation (CLIENT-SIDE)
 *
 * ✅ À utiliser dans :
 *   - Les composants React 'use client'
 *   - Les hooks de présentation
 *   - Le AuthContext
 *
 * ❌ NE PAS utiliser dans :
 *   - Les API Routes Next.js  → utiliser SymfonyAuthRepository
 *   - Les Server Components  → utiliser SymfonyAuthRepository
 *
 * Fonctionnement : appelle les API Routes Next.js (/api/auth/*)
 * qui servent de proxy sécurisé vers Symfony (cookie httpOnly).
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

export class AuthRepositoryImpl implements IAuthRepository {
  private baseURL: string = '/api/auth';

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        message: 'Une erreur est survenue' 
      }));
      throw new Error(error.message || 'Erreur lors de la requête');
    }

    if (response.status === 204) {
      return null as T;
    }

    return response.json();
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<void> {
    return this.request<void>('/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/me', {
      method: 'GET',
    });
  }

  async updateUser(data: UpdateUserData): Promise<User> {
    return this.request<User>('/update-profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    return this.request<void>('/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async requestPasswordReset(data: ResetPasswordRequestData): Promise<void> {
    return this.request<void>('/reset-password-request', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async confirmPasswordReset(data: ResetPasswordConfirmData): Promise<void> {
    return this.request<void>('/reset-password-confirm', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyEmail(data: VerifyEmailData): Promise<void> {
    return this.request<void>('/verify-email', {
      method: 'GET',
      headers: {
        'X-Verify-Token': data.token,
      },
    });
  }

  async resendVerificationEmail(): Promise<void> {
    return this.request<void>('/resend-verification', {
      method: 'POST',
    });
  }
}
