import { IAdministratorRepository } from '../../domain/repositories/IAdministratorRepository';
import { Administrator, CreateAdministratorData, UpdateAdministratorData } from '../../domain/entities/Administrator';
import { ClientApiClient } from '@/src/shared/infrastructure/api/ClientApiClient';

export class ClientAdministratorRepository implements IAdministratorRepository {
  private client: ClientApiClient;

  constructor() {
    this.client = new ClientApiClient('/api/auth');
  }

  async getAll(): Promise<Administrator[]> {
    return await this.client.get<Administrator[]>('/administrators');
  }

  async getById(id: number): Promise<Administrator> {
    return await this.client.get<Administrator>(`/administrators/${id}`);
  }

  async create(data: CreateAdministratorData): Promise<Administrator> {
    const response = await this.client.post<{ administrator: Administrator }>('/administrators', data);
    return response.administrator;
  }

  async update(id: number, data: UpdateAdministratorData): Promise<Administrator> {
    return await this.client.patch<Administrator>(`/administrators/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    await this.client.delete<void>(`/administrators/${id}`);
  }
}
