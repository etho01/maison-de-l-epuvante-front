import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import { Category } from '../../../domain/entities/Category';

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: number, data: Partial<Category>): Promise<Category> {
    return await this.categoryRepository.update(id, data);
  }
}
