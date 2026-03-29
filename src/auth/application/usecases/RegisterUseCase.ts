/**
 * Application Use Case: Register
 * Logique métier pour l'inscription
 */

import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { AuthResponse } from '../../domain/entities/AuthResponse';
import { RegisterData } from '../../domain/entities/User';

export class RegisterUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: RegisterData): Promise<AuthResponse> {
    // Validations
    if (!data.email || !data.password) {
      throw new Error('Email et mot de passe requis');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Email invalide');
    }

    if (data.password.length < 8) {
      throw new Error('Le mot de passe doit contenir au moins 8 caractères');
    }

    if (!data.firstName || data.firstName.trim() === '') {
      throw new Error('Le prénom est requis');
    }

    if (!data.lastName || data.lastName.trim() === '') {
      throw new Error('Le nom de famille est requis');
    }

    return await this.authRepository.register(data);
  }
}
