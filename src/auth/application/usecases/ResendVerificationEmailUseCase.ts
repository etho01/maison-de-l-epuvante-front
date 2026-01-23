/**
 * Application Use Case: Resend Verification Email
 * Logique métier pour renvoyer l'email de vérification
 */

import { IAuthRepository } from '../../domain/repositories/IAuthRepository';

export class ResendVerificationEmailUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.resendVerificationEmail();
  }
}
