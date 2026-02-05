import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import { Category, CreateCategoryData } from '../../../domain/entities/Category';

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(data: CreateCategoryData): Promise<Category> {
    return await this.categoryRepository.create(data);
  }
}
