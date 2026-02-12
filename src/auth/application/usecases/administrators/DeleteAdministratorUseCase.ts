import { IAdministratorRepository } from '../../../domain/repositories/IAdministratorRepository';

export class DeleteAdministratorUseCase {
  constructor(private administratorRepository: IAdministratorRepository) {}

  async execute(id: number): Promise<void> {
    return await this.administratorRepository.delete(id);
  }
}
