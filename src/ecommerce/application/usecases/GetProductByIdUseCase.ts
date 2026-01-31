import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';

export class GetProductByIdUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: number): Promise<Product> {
    return await this.productRepository.getById(id);
  }
}
