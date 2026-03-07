import { IOrderRepository } from '../../../domain/repositories/IOrderRepository';
import { Order, OrderStatus } from '../../../domain/entities/Order';

export class UpdateOrderStatusUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderId: number, status: OrderStatus): Promise<Order> {
    return await this.orderRepository.update(orderId, { status });
  }
}
