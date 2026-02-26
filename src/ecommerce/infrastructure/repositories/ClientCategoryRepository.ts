import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';
import { Category, CreateCategoryData, UpdateCategoryData } from '../../domain/entities/Category';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { GetCategoriesFilter } from '../../application/usecases/categories/GetCategoriesUseCase';
import { ClientApiClient } from '@/src/shared/infrastructure/api/ClientApiClient';

export class ClientCategoryRepository implements ICategoryRepository {
  private client: ClientApiClient;

  constructor() {
    this.client = new ClientApiClient('/api/ecommerce');
  }

  async getCategories(filter?: GetCategoriesFilter): Promise<PaginatedResponse<Category>> {
    const response = await this.client.get<PaginatedResponse<Category>>('/categories' + (filter ? `?page=${filter.page || 1}` : ''));
    return response;
  }

  async getAllCategories(): Promise<Category[]> {
    const response = await this.client.get<PaginatedResponse<Category>>('/categories/all');
    return response.member;
  }

  async getById(id: number): Promise<Category> {
    return await this.client.get<Category>(`/categories/${id}`);
  }

  async create(data: CreateCategoryData): Promise<Category> {
    return await this.client.post<Category>('/categories', data);
  }

  async update(id: number, data: UpdateCategoryData): Promise<Category> {
    return await this.client.patch<Category>(`/categories/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/categories/${id}`);
  }
}
