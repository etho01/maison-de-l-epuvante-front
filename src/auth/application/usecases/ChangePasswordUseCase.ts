/**
 * Application Use Case: Change Password
 * Logique métier pour le changement de mot de passe
 */

import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { ChangePasswordData } from '../../domain/entities/User';

export class ChangePasswordUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: ChangePasswordData): Promise<void> {
    // Validations
    if (!data.currentPassword || !data.newPassword) {
      throw new Error('Mots de passe requis');
    }

    if (data.newPassword.length < 8) {
      throw new Error('Le nouveau mot de passe doit contenir au moins 8 caractères');
    }

    if (data.currentPassword === data.newPassword) {
      throw new Error('Le nouveau mot de passe doit être différent de l\'ancien');
    }

    await this.authRepository.changePassword(data);
  }
}
