import { IProductRepository, PaginatedResponse } from '../../domain/repositories/IProductRepository';
import { Product, CreateProductData, UpdateProductData, ProductFilters } from '../../domain/entities/Product';

export class ClientProductRepository implements IProductRepository {
  private baseURL: string;

  constructor() {
    this.baseURL = '/api/ecommerce';
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Une erreur est survenue');
    }

    if (response.status === 204) {
      return null as T;
    }

    return await response.json();
  }

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
    
    return await this.request<PaginatedResponse<Product>>(endpoint);
  }

  async getById(id: number): Promise<Product> {
    return await this.request<Product>(`/products/${id}`);
  }

  async create(data: CreateProductData): Promise<Product> {
    return await this.request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async update(id: number, data: UpdateProductData): Promise<Product> {
    return await this.request<Product>(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(id: number): Promise<void> {
    await this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }
}
