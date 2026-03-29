/**
 * Tests unitaires — RegisterUseCase
 * Vérifie la logique d'inscription
 */

import { RegisterUseCase } from '@/src/auth/application/usecases/RegisterUseCase';
import { IAuthRepository } from '@/src/auth/domain/repositories/IAuthRepository';
import { AuthResponse } from '@/src/auth/domain/entities/AuthResponse';
import { User, RegisterData } from '@/src/auth/domain/entities/User';

// Mock du repository
class MockAuthRepository implements Partial<IAuthRepository> {
  async register(data: RegisterData): Promise<AuthResponse> {
    return {
      user: {
        id: '1',
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        roles: ['ROLE_USER'],
        isVerified: false,
        createdAt: new Date().toISOString(),
      } as User,
      token: 'fake-jwt-token',
    };
  }
}

describe('RegisterUseCase', () => {
  let useCase: RegisterUseCase;
  let mockRepository: MockAuthRepository;

  beforeEach(() => {
    mockRepository = new MockAuthRepository();
    useCase = new RegisterUseCase(mockRepository as IAuthRepository);
  });

  const validData: RegisterData = {
    email: 'newuser@example.com',
    password: 'SecurePass123!',
    firstName: 'John',
    lastName: 'Doe',
  };

  describe('Validation des données', () => {
    it('devrait rejeter si email est vide', async () => {
      await expect(
        useCase.execute({ ...validData, email: '' })
      ).rejects.toThrow();
    });

    it('devrait rejeter si email est invalide', async () => {
      await expect(
        useCase.execute({ ...validData, email: 'invalid-email' })
      ).rejects.toThrow();
    });

    it('devrait rejeter si password est vide', async () => {
      await expect(
        useCase.execute({ ...validData, password: '' })
      ).rejects.toThrow();
    });

    it('devrait rejeter si password est trop court', async () => {
      await expect(
        useCase.execute({ ...validData, password: '12345' })
      ).rejects.toThrow();
    });

    it('devrait rejeter si firstName est vide', async () => {
      await expect(
        useCase.execute({ ...validData, firstName: '' })
      ).rejects.toThrow();
    });

    it('devrait rejeter si lastName est vide', async () => {
      await expect(
        useCase.execute({ ...validData, lastName: '' })
      ).rejects.toThrow();
    });
  });

  describe('Inscription réussie', () => {
    it('devrait créer un utilisateur avec des données valides', async () => {
      const result = await useCase.execute(validData);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(validData.email);
      expect(result.user.firstName).toBe(validData.firstName);
      expect(result.user.lastName).toBe(validData.lastName);
      expect(result.user.roles).toContain('ROLE_USER');
    });

    it('devrait accepter un password de 8 caractères', async () => {
      const result = await useCase.execute({
        ...validData,
        password: 'Pass123!',
      });

      expect(result.user).toBeDefined();
    });

    it('devrait accepter des noms avec accents', async () => {
      const result = await useCase.execute({
        ...validData,
        firstName: 'François',
        lastName: 'García',
      });

      expect(result.user.firstName).toBe('François');
      expect(result.user.lastName).toBe('García');
    });
  });

  describe('Gestion des erreurs', () => {
    it('devrait propager les erreurs du repository', async () => {
      const errorRepository = {
        register: jest.fn().mockRejectedValue(new Error('Email already exists')),
      } as unknown as IAuthRepository;

      const useCaseWithError = new RegisterUseCase(errorRepository);

      await expect(
        useCaseWithError.execute(validData)
      ).rejects.toThrow('Email already exists');
    });
  });
});
