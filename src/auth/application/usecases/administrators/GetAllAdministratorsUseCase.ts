import { IAdministratorRepository } from '../../../domain/repositories/IAdministratorRepository';
import { Administrator } from '../../../domain/entities/Administrator';

export class GetAllAdministratorsUseCase {
  constructor(private administratorRepository: IAdministratorRepository) {}

  async execute(): Promise<Administrator[]> {
    return await this.administratorRepository.getAll();
  }
}
