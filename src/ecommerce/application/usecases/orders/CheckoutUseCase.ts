import { IOrderRepository } from '../../../domain/repositories/IOrderRepository';
import { Order, CheckoutData } from '../../../domain/entities/Order';

export class CheckoutUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(data: CheckoutData): Promise<Order> {
    return await this.orderRepository.checkout(data);
  }
}
