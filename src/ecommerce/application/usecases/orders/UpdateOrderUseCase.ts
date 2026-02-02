import { IOrderRepository } from '../../../domain/repositories/IOrderRepository';
import { Order } from '../../../domain/entities/Order';

export class UpdateOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(id: number, data: Partial<Order>): Promise<Order> {
    return await this.orderRepository.update(id, data);
  }
}
