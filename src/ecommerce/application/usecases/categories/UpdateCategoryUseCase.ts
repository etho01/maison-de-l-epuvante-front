import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import { Category, UpdateCategoryData } from '../../../domain/entities/Category';

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: number, data: UpdateCategoryData): Promise<Category> {
    return await this.categoryRepository.update(id, data);
  }
}
