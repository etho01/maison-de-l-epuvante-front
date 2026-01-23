/**
 * Application Use Case: Confirm Password Reset
 * Logique métier pour la confirmation de réinitialisation de mot de passe
 */

import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { ResetPasswordConfirmData } from '../../domain/entities/User';

export class ConfirmPasswordResetUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: ResetPasswordConfirmData): Promise<void> {
    // Validations
    if (!data.token) {
      throw new Error('Token requis');
    }

    if (!data.password) {
      throw new Error('Mot de passe requis');
    }

    if (data.password.length < 8) {
      throw new Error('Le mot de passe doit contenir au moins 8 caractères');
    }

    await this.authRepository.confirmPasswordReset(data);
  }
}
