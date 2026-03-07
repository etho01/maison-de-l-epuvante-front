import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { User } from '../../domain/entities/User';

export class GetUserByIdUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(id: string): Promise<User> {
    // Pour l'instant, nous utilisons getCurrentUser
    // Cette méthode devrait être étendue dans le repository pour supporter getUserById
    // TODO: Ajouter getUserById au IAuthRepository et à SymfonyAuthRepository
    const user = await this.authRepository.getCurrentUser();
    if (user.id !== id) {
      throw new Error('User not found');
    }
    return user;
  }
}
