
import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';
import { Category, CreateCategoryData, UpdateCategoryData } from '../../domain/entities/Category';
import { apiClient } from '@/src/auth/infrastructure/api/apiClient';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { GetCategoriesFilter } from '../../application/usecases/categories/GetCategoriesUseCase';

export class SymfonyCategoryRepository implements ICategoryRepository {
  async getCategories(filter?: GetCategoriesFilter): Promise<PaginatedResponse<Category>> {
    const response = await apiClient.get<PaginatedResponse<Category>>('/categories' + (filter ? `?page=${filter.page || 1}` : ''));
    return response;
  }

  async getAllCategories(): Promise<Category[]> {
    const response = await apiClient.get<PaginatedResponse<Category>>('/categories?pagination=false');
    return response.member;
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
