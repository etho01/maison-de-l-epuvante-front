import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';
import { Category } from '../../domain/entities/Category';
import { PaginatedResponse } from '../../domain/repositories/IProductRepository';

export class GetCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<PaginatedResponse<Category>> {
    return await this.categoryRepository.getCategories();
  }
}
