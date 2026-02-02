import { IProductRepository, PaginatedResponse } from '../../domain/repositories/IProductRepository';
import { Product, ProductFilters } from '../../domain/entities/Product';

export class GetProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    let result = await this.productRepository.getAll();
    console.log('GetProductsUseCase executed. Initial result:', result);
    return await this.productRepository.getAll(filters);
  }
}
