import { IAdministratorRepository } from '../../../domain/repositories/IAdministratorRepository';
import { Administrator } from '../../../domain/entities/Administrator';

export class GetAdministratorByIdUseCase {
  constructor(private administratorRepository: IAdministratorRepository) {}

  async execute(id: number): Promise<Administrator> {
    return await this.administratorRepository.getById(id);
  }
}
