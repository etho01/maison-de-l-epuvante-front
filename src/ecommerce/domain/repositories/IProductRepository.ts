import { PaginatedResponse, Pagination } from '@/src/shared/domain/Pagination';
import { Product, CreateProductData, UpdateProductData, ProductFilters } from '../entities/Product';

export interface IProductRepository {
  getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>>;
  getById(id: number): Promise<Product>;
  getProductBySlug(slug: string): Promise<Product>;
  create(data: CreateProductData): Promise<Product>;
  update(id: number, data: UpdateProductData): Promise<Product>;
  delete(id: number): Promise<void>;
}
