
import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';
import { Category, CreateCategoryData, UpdateCategoryData } from '../../domain/entities/Category';
import { serverApiClient } from '@/src/shared/infrastructure/api/ServerApiClient';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { GetCategoriesFilter } from '../../application/usecases/categories/GetCategoriesUseCase';

export class SymfonyCategoryRepository implements ICategoryRepository {
  async getCategories(filter?: GetCategoriesFilter): Promise<PaginatedResponse<Category>> {
    const response = await serverApiClient.get<PaginatedResponse<Category>>('/categories' + (filter ? `?page=${filter.page || 1}` : ''));
    return response;
  }

  async getAllCategories(): Promise<Category[]> {
    const response = await serverApiClient.get<PaginatedResponse<Category>>('/categories?pagination=false');
    return response.member;
  }

  async getById(id: number): Promise<Category> {
    return await serverApiClient.get<Category>(`/categories/${id}`);
  }

  async create(data: CreateCategoryData): Promise<Category> {
    return await serverApiClient.post<Category>('/categories', data);
  }

  async update(id: number, data: UpdateCategoryData): Promise<Category> {
    return await serverApiClient.patch<Category>(`/categories/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    await serverApiClient.delete(`/categories/${id}`);
  }
}
