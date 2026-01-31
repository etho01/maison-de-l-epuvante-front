import { Category, CreateCategoryData, UpdateCategoryData } from '../entities/Category';

export interface ICategoryRepository {
  getAll(): Promise<Category[]>;
  getById(id: number): Promise<Category>;
  create(data: CreateCategoryData): Promise<Category>;
  update(id: number, data: UpdateCategoryData): Promise<Category>;
  delete(id: number): Promise<void>;
}
