import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { Product, UpdateProductData } from '../../../domain/entities/Product';

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: number, data: UpdateProductData): Promise<Product> {
    return await this.productRepository.update(id, data);
  }
}
