import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { Product, ProductFilters } from '../../../domain/entities/Product';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

export class GetProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    return await this.productRepository.getProducts(filters);
  }
}
