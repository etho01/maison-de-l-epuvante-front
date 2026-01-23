/**
 * Application Use Case: Login
 * Logique métier pour l'authentification
 */

import { IAuthRepository, AuthResponse } from '../../domain/repositories/IAuthRepository';
import { LoginCredentials } from '../../domain/entities/User';

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<AuthResponse> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email et mot de passe requis');
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      throw new Error('Email invalide');
    }

    return await this.authRepository.login(credentials);
  }
}
