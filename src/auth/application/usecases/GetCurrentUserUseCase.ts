/**
 * Application Use Case: Get Current User
 * Récupère les informations de l'utilisateur connecté
 */

import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { User } from '../../domain/entities/User';

export class GetCurrentUserUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<User> {
    return await this.authRepository.getCurrentUser();
  }
}
