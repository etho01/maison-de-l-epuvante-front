import { apiClient } from '@/src/auth/infrastructure/api/apiClient';
import { IProductRepository, PaginatedResponse } from '../../domain/repositories/IProductRepository';
import { Product, CreateProductData, UpdateProductData, ProductFilters } from '../../domain/entities/Product';

export class SymfonyProductRepository implements IProductRepository {
  async getAll(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams();
    
    if (filters) {
      if (filters.name) params.append('name', filters.name);
      if (filters.type) params.append('type', filters.type);
      if (filters['category.id']) params.append('category.id', filters['category.id'].toString());
      if (filters['price[gte]']) params.append('price[gte]', filters['price[gte]'].toString());
      if (filters['price[lte]']) params.append('price[lte]', filters['price[lte]'].toString());
      if (filters.active !== undefined) params.append('active', filters.active.toString());
      if (filters.exclusiveOnline !== undefined) params.append('exclusiveOnline', filters.exclusiveOnline.toString());
      if (filters.page) params.append('page', filters.page.toString());
    }

    const queryString = params.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    
    return await apiClient.get<PaginatedResponse<Product>>(endpoint);
  }

  async getById(id: number): Promise<Product> {
    return await apiClient.get<Product>(`/products/${id}`);
  }

  async create(data: CreateProductData): Promise<Product> {
    return await apiClient.post<Product>('/products', data);
  }

  async update(id: number, data: UpdateProductData): Promise<Product> {
    return await apiClient.patch<Product>(`/products/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  }
}
