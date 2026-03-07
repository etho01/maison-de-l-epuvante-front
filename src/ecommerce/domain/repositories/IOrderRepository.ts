import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { Order, CheckoutData, UpdateOrderData, CheckoutResponse, OrderStatus } from '../entities/Order';

export interface OrderFilters {
  page?: number;
  status?: OrderStatus;
}

export interface IOrderRepository {
  getOrders(filters?: OrderFilters): Promise<PaginatedResponse<Order>>;
  getById(id: number): Promise<Order>;
  getByPaymentIntentId(paymentIntentId: string): Promise<Order>;
  checkout(data: CheckoutData): Promise<CheckoutResponse>;
  update(id: number, data: UpdateOrderData): Promise<Order>;
}
