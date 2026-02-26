import { serverApiClient } from '@/src/shared/infrastructure/api/ServerApiClient';
import { IAdministratorRepository } from '../../domain/repositories/IAdministratorRepository';
import { Administrator, CreateAdministratorData, UpdateAdministratorData } from '../../domain/entities/Administrator';

export class SymfonyAdministratorRepository implements IAdministratorRepository {
  async getAll(): Promise<Administrator[]> {
    return await serverApiClient.get<Administrator[]>('/administrators');
  }

  async getById(id: number): Promise<Administrator> {
    return await serverApiClient.get<Administrator>(`/administrators/${id}`);
  }

  async create(data: CreateAdministratorData): Promise<Administrator> {
    const response = await serverApiClient.post<{ administrator: Administrator }>('/administrators', data);
    return response.administrator;
  }

  async update(id: number, data: UpdateAdministratorData): Promise<Administrator> {
    return await serverApiClient.patch<Administrator>(`/administrators/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    await serverApiClient.delete(`/administrators/${id}`);
  }
}
