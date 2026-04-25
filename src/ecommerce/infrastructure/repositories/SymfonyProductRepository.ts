import { serverApiClient } from '@/src/shared/infrastructure/api/ServerApiClient';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product, CreateProductData, UpdateProductData, ProductFilters } from '../../domain/entities/Product';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

export class SymfonyProductRepository implements IProductRepository {
  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams();
    
    if (filters) {
      if (filters.name) params.append('name', filters.name);
      if (filters.type) params.append('type', filters.type.join(','));
      if (filters['category.id']) params.append('category.id', filters['category.id'].toString());
      if (filters['price[gte]']) params.append('price[gte]', filters['price[gte]'].toString());
      if (filters['price[lte]']) params.append('price[lte]', filters['price[lte]'].toString());
      if (filters.active !== undefined) params.append('active', filters.active.toString());
      if (filters.exclusiveOnline !== undefined) params.append('exclusiveOnline', filters.exclusiveOnline.toString());
      if (filters.page) params.append('page', filters.page.toString());
    }

    const queryString = params.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    
    return await serverApiClient.get<PaginatedResponse<Product>>(endpoint);
  }

  async getById(id: number): Promise<Product> {
    return await serverApiClient.get<Product>(`/products/${id}`);
  }

  async getBySlug(slug: string): Promise<Product> {
    return await serverApiClient.get<Product>(`/products/slug/${slug}`);
  }

  async getProductBySlug(slug: string): Promise<Product> {
    return await serverApiClient.get<Product>(`/products/slug/${slug}`);
  }

  async create(data: CreateProductData): Promise<Product> {
    return await serverApiClient.post<Product>('/products', data);
  }

  async update(id: number, data: UpdateProductData): Promise<Product> {
    return await serverApiClient.patch<Product>(`/products/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    await serverApiClient.delete(`/products/${id}`);
  }
}
