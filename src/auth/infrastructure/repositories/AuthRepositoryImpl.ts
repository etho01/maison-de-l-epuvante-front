/**
 * Infrastructure: Auth Repository Implementation
 * Implémentation concrète du repository d'authentification
 * Communique avec les API routes Next.js (qui servent de proxy vers Symfony)
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
