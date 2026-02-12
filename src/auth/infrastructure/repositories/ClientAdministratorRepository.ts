import { IAdministratorRepository } from '../../domain/repositories/IAdministratorRepository';
import { Administrator, CreateAdministratorData, UpdateAdministratorData } from '../../domain/entities/Administrator';

export class ClientAdministratorRepository implements IAdministratorRepository {
  private baseURL: string;

  constructor() {
    this.baseURL = '/api/auth';
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Une erreur est survenue');
    }

    if (response.status === 204) {
      return null as T;
    }

    return await response.json();
  }

  async getAll(): Promise<Administrator[]> {
    return await this.request<Administrator[]>('/administrators');
  }

  async getById(id: number): Promise<Administrator> {
    return await this.request<Administrator>(`/administrators/${id}`);
  }

  async create(data: CreateAdministratorData): Promise<Administrator> {
    const response = await this.request<{ administrator: Administrator }>('/administrators', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.administrator;
  }

  async update(id: number, data: UpdateAdministratorData): Promise<Administrator> {
    return await this.request<Administrator>(`/administrators/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(id: number): Promise<void> {
    await this.request<void>(`/administrators/${id}`, {
      method: 'DELETE',
    });
  }
}
