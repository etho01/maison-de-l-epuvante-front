import { IOrderRepository, OrderFilters } from '../../../domain/repositories/IOrderRepository';
import { Order } from '../../../domain/entities/Order';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

export class GetOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(filters?: OrderFilters): Promise<PaginatedResponse<Order>> {
    return await this.orderRepository.getOrders(filters);
  }
}
