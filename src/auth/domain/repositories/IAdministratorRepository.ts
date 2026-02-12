import { Administrator, CreateAdministratorData, UpdateAdministratorData } from '../entities/Administrator';

export interface IAdministratorRepository {
  getAll(): Promise<Administrator[]>;
  getById(id: number): Promise<Administrator>;
  create(data: CreateAdministratorData): Promise<Administrator>;
  update(id: number, data: UpdateAdministratorData): Promise<Administrator>;
  delete(id: number): Promise<void>;
}
