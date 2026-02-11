import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { Category, CreateCategoryData, UpdateCategoryData } from '../entities/Category';
import { GetCategoriesFilter } from '../../application/usecases/categories/GetCategoriesUseCase';

export interface ICategoryRepository {
  getCategories(filter?: GetCategoriesFilter): Promise<PaginatedResponse<Category>>;
  getAllCategories(): Promise<Category[]>;
  getById(id: number): Promise<Category>;
  create(data: CreateCategoryData): Promise<Category>;
  update(id: number, data: UpdateCategoryData): Promise<Category>;
  delete(id: number): Promise<void>;
}
