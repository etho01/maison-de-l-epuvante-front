import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import { Category } from '../../../domain/entities/Category';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';


export interface GetCategoriesFilter {
  page?: number;
}

export class GetCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(filter?: GetCategoriesFilter): Promise<PaginatedResponse<Category>> {
    return await this.categoryRepository.getCategories(filter);
  }
}
