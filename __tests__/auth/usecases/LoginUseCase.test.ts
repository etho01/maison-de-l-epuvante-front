/**
 * Tests unitaires — LoginUseCase
 * Vérifie la logique de connexion
 */

import { LoginUseCase } from '@/src/auth/application/usecases/LoginUseCase';
import { IAuthRepository } from '@/src/auth/domain/repositories/IAuthRepository';
import { AuthResponse } from '@/src/auth/domain/entities/AuthResponse';
import { User } from '@/src/auth/domain/entities/User';

// Mock du repository
class MockAuthRepository implements Partial<IAuthRepository> {
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    return {
      user: {
        id: '1',
        email: credentials.email,
        firstName: 'John',
        lastName: 'Doe',
        roles: ['ROLE_USER'],
        isVerified: true,
        createdAt: '2024-01-01',
      } as User,
      token: 'fake-jwt-token',
    };
  }
}

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockRepository: MockAuthRepository;

  beforeEach(() => {
    mockRepository = new MockAuthRepository();
    useCase = new LoginUseCase(mockRepository as IAuthRepository);
  });

  describe('Validation des credentials', () => {
    it('devrait rejeter si email est vide', async () => {
      await expect(
        useCase.execute({ email: '', password: 'password123' })
      ).rejects.toThrow('Email et mot de passe requis');
    });

    it('devrait rejeter si password est vide', async () => {
      await expect(
        useCase.execute({ email: 'test@example.com', password: '' })
      ).rejects.toThrow('Email et mot de passe requis');
    });

    it('devrait rejeter si email est invalide', async () => {
      await expect(
        useCase.execute({ email: 'invalid-email', password: 'password123' })
      ).rejects.toThrow('Email invalide');
    });

    it('devrait rejeter si email n\'a pas de @', async () => {
      await expect(
        useCase.execute({ email: 'testexample.com', password: 'password123' })
      ).rejects.toThrow('Email invalide');
    });

    it('devrait rejeter si email n\'a pas de domaine', async () => {
      await expect(
        useCase.execute({ email: 'test@', password: 'password123' })
      ).rejects.toThrow('Email invalide');
    });
  });

  describe('Connexion réussie', () => {
    it('devrait retourner user et token avec des credentials valides', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await useCase.execute(credentials);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(credentials.email);
      expect(result.token).toBe('fake-jwt-token');
    });

    it('devrait accepter un email avec des points', async () => {
      const credentials = {
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const result = await useCase.execute(credentials);

      expect(result.user.email).toBe(credentials.email);
    });

    it('devrait accepter un email avec des chiffres', async () => {
      const credentials = {
        email: 'user123@example.com',
        password: 'password123',
      };

      const result = await useCase.execute(credentials);

      expect(result.user.email).toBe(credentials.email);
    });
  });

  describe('Gestion des erreurs repository', () => {
    it('devrait propager les erreurs du repository', async () => {
      const errorRepository = {
        login: jest.fn().mockRejectedValue(new Error('Invalid credentials')),
      } as unknown as IAuthRepository;

      const useCaseWithError = new LoginUseCase(errorRepository);

      await expect(
        useCaseWithError.execute({
          email: 'test@example.com',
          password: 'wrong-password',
        })
      ).rejects.toThrow('Invalid credentials');
    });
  });
});
