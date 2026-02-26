import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { Order, CheckoutData, UpdateOrderData, CheckoutResponse } from '../entities/Order';

export interface IOrderRepository {
  getOrders(page?: number): Promise<PaginatedResponse<Order>>;
  getById(id: number): Promise<Order>;
  checkout(data: CheckoutData): Promise<CheckoutResponse>;
  update(id: number, data: UpdateOrderData): Promise<Order>;
}
