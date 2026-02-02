import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import { Category } from '../../../domain/entities/Category';

export class GetCategoryByIdUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: number): Promise<Category> {
    return await this.categoryRepository.getById(id);
  }
}
