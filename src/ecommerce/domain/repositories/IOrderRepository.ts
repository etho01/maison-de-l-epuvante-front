import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { Order, CheckoutData, UpdateOrderData } from '../entities/Order';

export interface IOrderRepository {
  getOrders(page?: number): Promise<PaginatedResponse<Order>>;
  getById(id: number): Promise<Order>;
  checkout(data: CheckoutData): Promise<Order>;
  update(id: number, data: UpdateOrderData): Promise<Order>;
}
