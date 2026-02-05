import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { Product, CreateProductData } from '../../../domain/entities/Product';

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(data: CreateProductData): Promise<Product> {
    return await this.productRepository.create(data);
  }
}
