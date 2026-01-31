
import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';
import { Category, CreateCategoryData, UpdateCategoryData } from '../../domain/entities/Category';
import { apiClient } from '@/src/auth/infrastructure/api/apiClient';

export class SymfonyCategoryRepository implements ICategoryRepository {
  async getAll(): Promise<Category[]> {
    const response = await apiClient.get<{ 'hydra:member': Category[] }>('/categories');
    return response['hydra:member'];
  }

  async getById(id: number): Promise<Category> {
    return await apiClient.get<Category>(`/categories/${id}`);
  }

  async create(data: CreateCategoryData): Promise<Category> {
    return await apiClient.post<Category>('/categories', data);
  }

  async update(id: number, data: UpdateCategoryData): Promise<Category> {
    return await apiClient.patch<Category>(`/categories/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  }
}
