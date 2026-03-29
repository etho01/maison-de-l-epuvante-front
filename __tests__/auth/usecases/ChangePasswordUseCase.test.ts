/**
 * Tests unitaires — ChangePasswordUseCase
 * Vérifie la logique de changement de mot de passe
 */

import { ChangePasswordUseCase } from '@/src/auth/application/usecases/ChangePasswordUseCase';
import { IAuthRepository } from '@/src/auth/domain/repositories/IAuthRepository';
import { ChangePasswordData } from '@/src/auth/domain/entities/User';

// Mock du repository
class MockAuthRepository implements Partial<IAuthRepository> {
  async changePassword(data: ChangePasswordData): Promise<void> {
    // Simuler une vérification du mot de passe actuel
    if (data.currentPassword === 'wrong-password') {
      throw new Error('Current password is incorrect');
    }
  }
}

describe('ChangePasswordUseCase', () => {
  let useCase: ChangePasswordUseCase;
  let mockRepository: MockAuthRepository;

  beforeEach(() => {
    mockRepository = new MockAuthRepository();
    useCase = new ChangePasswordUseCase(mockRepository as IAuthRepository);
  });

  describe('Validation des données', () => {
    it('devrait rejeter si currentPassword est vide', async () => {
      await expect(
        useCase.execute({
          currentPassword: '',
          newPassword: 'NewPass123!',
        })
      ).rejects.toThrow();
    });

    it('devrait rejeter si newPassword est vide', async () => {
      await expect(
        useCase.execute({
          currentPassword: 'OldPass123!',
          newPassword: '',
        })
      ).rejects.toThrow();
    });

    it('devrait rejeter si newPassword est trop court', async () => {
      await expect(
        useCase.execute({
          currentPassword: 'OldPass123!',
          newPassword: '12345',
        })
      ).rejects.toThrow();
    });

    it('devrait rejeter si les deux mots de passe sont identiques', async () => {
      await expect(
        useCase.execute({
          currentPassword: 'SamePass123!',
          newPassword: 'SamePass123!',
        })
      ).rejects.toThrow('Le nouveau mot de passe doit être différent');
    });
  });

  describe('Changement réussi', () => {
    it('devrait changer le mot de passe avec des données valides', async () => {
      await expect(
        useCase.execute({
          currentPassword: 'OldPass123!',
          newPassword: 'NewPass123!',
        })
      ).resolves.not.toThrow();
    });

    it('devrait accepter un nouveau mot de passe de 8 caractères', async () => {
      await expect(
        useCase.execute({
          currentPassword: 'OldPass123!',
          newPassword: 'Pass123!',
        })
      ).resolves.not.toThrow();
    });
  });

  describe('Gestion des erreurs', () => {
    it('devrait propager les erreurs du repository', async () => {
      await expect(
        useCase.execute({
          currentPassword: 'wrong-password',
          newPassword: 'NewPass123!',
        })
      ).rejects.toThrow('Current password is incorrect');
    });
  });
});
