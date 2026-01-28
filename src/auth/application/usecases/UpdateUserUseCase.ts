/**
 * Application Use Case: Update User
 * Logique métier pour mettre à jour les informations utilisateur
 */

import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { UpdateUserData } from '../../domain/entities/UpdateUserData';
import { User } from '../../domain/entities/User';

export class UpdateUserUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: UpdateUserData): Promise<User> {
    // Validation
    if (!data.email || !data.email.includes('@')) {
      throw new Error('Email invalide');
    }

    if (!data.firstName || data.firstName.length < 2) {
      throw new Error('Le prénom doit contenir au moins 2 caractères');
    }

    if (!data.lastName || data.lastName.length < 2) {
      throw new Error('Le nom doit contenir au moins 2 caractères');
    }

    // Appel au repository
    return await this.authRepository.updateUser(data);
  }
}
