import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';
import { Category, CreateCategoryData, UpdateCategoryData } from '../../domain/entities/Category';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

export class ClientCategoryRepository implements ICategoryRepository {
  private baseURL: string;

  constructor() {
    this.baseURL = '/api/ecommerce';
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

  async getCategories(): Promise<PaginatedResponse<Category>> {
    const response = await this.request<PaginatedResponse<Category>>('/categories');
    return response;
  }

  async getAllCategories(): Promise<Category[]> {
    const response = await this.request<PaginatedResponse<Category>>('/categories/all');
    return response.member;
  }

  async getById(id: number): Promise<Category> {
    return await this.request<Category>(`/categories/${id}`);
  }

  async create(data: CreateCategoryData): Promise<Category> {
    return await this.request<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async update(id: number, data: UpdateCategoryData): Promise<Category> {
    return await this.request<Category>(`/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(id: number): Promise<void> {
    await this.request(`/categories/${id}`, {
      method: 'DELETE',
    });
  }
}
