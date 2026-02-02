import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order, CheckoutData, UpdateOrderData } from '../../domain/entities/Order';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

export class ClientOrderRepository implements IOrderRepository {
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

  async getOrders(page?: number): Promise<PaginatedResponse<Order>> {
    const endpoint = page ? `/orders?page=${page}` : '/orders';
    return await this.request<PaginatedResponse<Order>>(endpoint);
  }

  async getById(id: number): Promise<Order> {
    return await this.request<Order>(`/orders/${id}`);
  }

  async checkout(data: CheckoutData): Promise<Order> {
    return await this.request<Order>('/orders/checkout', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async update(id: number, data: UpdateOrderData): Promise<Order> {
    return await this.request<Order>(`/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}
