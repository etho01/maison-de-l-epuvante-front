/**
 * Application Use Case: Request Password Reset
 * Logique métier pour la demande de réinitialisation de mot de passe
 */

import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { ResetPasswordRequestData } from '../../domain/entities/User';

export class RequestPasswordResetUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: ResetPasswordRequestData): Promise<void> {
    // Validations
    if (!data.email) {
      throw new Error('Email requis');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Email invalide');
    }

    await this.authRepository.requestPasswordReset(data);
  }
}
