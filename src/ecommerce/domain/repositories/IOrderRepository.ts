import { Order, CheckoutData, UpdateOrderData } from '../entities/Order';
import { PaginatedResponse } from './IProductRepository';

export interface IOrderRepository {
  getAll(page?: number): Promise<PaginatedResponse<Order>>;
  getById(id: number): Promise<Order>;
  checkout(data: CheckoutData): Promise<Order>;
  update(id: number, data: UpdateOrderData): Promise<Order>;
}
