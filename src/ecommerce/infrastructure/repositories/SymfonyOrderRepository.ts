import { serverApiClient } from '@/src/shared/infrastructure/api/ServerApiClient';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order, CheckoutData, UpdateOrderData, CheckoutResponse } from '../../domain/entities/Order';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

export class SymfonyOrderRepository implements IOrderRepository {
  async getOrders(page?: number): Promise<PaginatedResponse<Order>> {
    const endpoint = page ? `/orders?page=${page}` : '/orders';
    return await serverApiClient.get<PaginatedResponse<Order>>(endpoint);
  }

  async getById(id: number): Promise<Order> {
    console.log('Fetching order with id:', id);
    return await serverApiClient.get<Order>(`/orders/${id}`);
  }

  async getByPaymentIntentId(paymentIntentId: string): Promise<Order> {
    console.log('Fetching order with paymentIntentId:', paymentIntentId);
    return await serverApiClient.get<Order>(`/orders/payment-intent/${paymentIntentId}`);
  }

  async checkout(data: CheckoutData): Promise<CheckoutResponse> {
    return await serverApiClient.post<CheckoutResponse>('/orders/checkout', data);
  }

  async update(id: number, data: UpdateOrderData): Promise<Order> {
    return await serverApiClient.patch<Order>(`/orders/${id}`, data);
  }
}
