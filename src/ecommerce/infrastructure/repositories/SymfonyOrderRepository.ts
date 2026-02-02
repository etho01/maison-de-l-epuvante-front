import { apiClient } from '@/src/auth/infrastructure/api/apiClient';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order, CheckoutData, UpdateOrderData } from '../../domain/entities/Order';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

export class SymfonyOrderRepository implements IOrderRepository {
  async getOrders(page?: number): Promise<PaginatedResponse<Order>> {
    const endpoint = page ? `/orders?page=${page}` : '/orders';
    return await apiClient.get<PaginatedResponse<Order>>(endpoint);
  }

  async getById(id: number): Promise<Order> {
    return await apiClient.get<Order>(`/orders/${id}`);
  }

  async checkout(data: CheckoutData): Promise<Order> {
    return await apiClient.post<Order>('/orders/checkout', data);
  }

  async update(id: number, data: UpdateOrderData): Promise<Order> {
    return await apiClient.patch<Order>(`/orders/${id}`, data);
  }
}
