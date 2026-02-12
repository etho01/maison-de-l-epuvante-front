import { apiClient } from '../api/apiClient';
import { IAdministratorRepository } from '../../domain/repositories/IAdministratorRepository';
import { Administrator, CreateAdministratorData, UpdateAdministratorData } from '../../domain/entities/Administrator';

export class SymfonyAdministratorRepository implements IAdministratorRepository {
  async getAll(): Promise<Administrator[]> {
    return await apiClient.get<Administrator[]>('/administrators');
  }

  async getById(id: number): Promise<Administrator> {
    return await apiClient.get<Administrator>(`/administrators/${id}`);
  }

  async create(data: CreateAdministratorData): Promise<Administrator> {
    const response = await apiClient.post<{ administrator: Administrator }>('/administrators', data);
    return response.administrator;
  }

  async update(id: number, data: UpdateAdministratorData): Promise<Administrator> {
    return await apiClient.patch<Administrator>(`/administrators/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/administrators/${id}`);
  }
}
