import { IOrderRepository } from '../../../domain/repositories/IOrderRepository';
import { Order, UpdateOrderData } from '../../../domain/entities/Order';

export class UpdateOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(id: number, data: UpdateOrderData): Promise<Order> {
    return await this.orderRepository.update(id, data);
  }
}
