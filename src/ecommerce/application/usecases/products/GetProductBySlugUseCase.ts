import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { Product } from '../../../domain/entities/Product';

export class GetProductBySlugUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(slug: string): Promise<Product> {
    if (!slug || slug.trim() === '') {
      throw new Error('Le slug est requis');
    }
    
    return await this.productRepository.getBySlug(slug);
  }
}
