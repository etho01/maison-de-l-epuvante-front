/**
 * Application Use Case: Verify Email
 * Logique métier pour la vérification de l'email
 */

import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { VerifyEmailData } from '../../domain/entities/User';

export class VerifyEmailUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: VerifyEmailData): Promise<void> {
    // Validations
    if (!data.token) {
      throw new Error('Token de vérification requis');
    }

    await this.authRepository.verifyEmail(data);
  }
}
