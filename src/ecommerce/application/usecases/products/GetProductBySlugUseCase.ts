import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { Product } from '../../../domain/entities/Product';

export class GetProductBySlugUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(slug: string): Promise<Product> {
    return await this.productRepository.getBySlug(slug);
  }
}
