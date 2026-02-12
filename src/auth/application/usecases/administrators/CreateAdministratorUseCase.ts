import { IAdministratorRepository } from '../../../domain/repositories/IAdministratorRepository';
import { Administrator, CreateAdministratorData } from '../../../domain/entities/Administrator';

export class CreateAdministratorUseCase {
  constructor(private administratorRepository: IAdministratorRepository) {}

  async execute(data: CreateAdministratorData): Promise<Administrator> {
    return await this.administratorRepository.create(data);
  }
}
