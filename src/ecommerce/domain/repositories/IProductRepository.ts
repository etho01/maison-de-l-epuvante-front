import { Product, CreateProductData, UpdateProductData, ProductFilters } from '../entities/Product';

export interface PaginatedResponse<T> {
  'hydra:member': T[];
  'hydra:totalItems': number;
  'hydra:view'?: {
    '@id': string;
    'hydra:first'?: string;
    'hydra:last'?: string;
    'hydra:previous'?: string;
    'hydra:next'?: string;
  };
}

export interface IProductRepository {
  getAll(filters?: ProductFilters): Promise<PaginatedResponse<Product>>;
  getById(id: number): Promise<Product>;
  create(data: CreateProductData): Promise<Product>;
  update(id: number, data: UpdateProductData): Promise<Product>;
  delete(id: number): Promise<void>;
}
