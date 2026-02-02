import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import { Category } from '../../../domain/entities/Category';

export class GetAllCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.getAllCategories();
  }
}
