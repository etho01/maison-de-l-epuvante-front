import { IAdministratorRepository } from '../../../domain/repositories/IAdministratorRepository';
import { Administrator, UpdateAdministratorData } from '../../../domain/entities/Administrator';

export class UpdateAdministratorUseCase {
  constructor(private administratorRepository: IAdministratorRepository) {}

  async execute(id: number, data: UpdateAdministratorData): Promise<Administrator> {
    return await this.administratorRepository.update(id, data);
  }
}
