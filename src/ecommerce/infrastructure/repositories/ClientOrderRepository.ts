import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order, CheckoutData, UpdateOrderData, CheckoutResponse } from '../../domain/entities/Order';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { ClientApiClient } from '@/src/shared/infrastructure/api/ClientApiClient';

export class ClientOrderRepository implements IOrderRepository {
  private client: ClientApiClient;

  constructor() {
    this.client = new ClientApiClient('/api/ecommerce');
  }

  async getOrders(page?: number): Promise<PaginatedResponse<Order>> {
    const endpoint = page ? `/orders?page=${page}` : '/orders';
    return await this.client.get<PaginatedResponse<Order>>(endpoint);
  }

  async getById(id: number): Promise<Order> {
    return await this.client.get<Order>(`/orders/${id}`);
  }

  async checkout(data: CheckoutData): Promise<CheckoutResponse> {
    return await this.client.post<CheckoutResponse>('/orders/checkout', data);
  }

  async update(id: number, data: UpdateOrderData): Promise<Order> {
    return await this.client.patch<Order>(`/orders/${id}`, data);
  }
}
