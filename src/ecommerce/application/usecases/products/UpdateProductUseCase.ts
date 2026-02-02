import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { Product } from '../../../domain/entities/Product';

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: number, data: Partial<Product>): Promise<Product> {
    return await this.productRepository.update(id, data);
  }
}
