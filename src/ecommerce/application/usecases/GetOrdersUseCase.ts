import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order } from '../../domain/entities/Order';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

export class GetOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(page?: number): Promise<PaginatedResponse<Order>> {
    return await this.orderRepository.getOrders(page);
  }
}
