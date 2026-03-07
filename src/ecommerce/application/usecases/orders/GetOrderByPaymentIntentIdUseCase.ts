import { IOrderRepository } from '../../../domain/repositories/IOrderRepository';
import { Order } from '../../../domain/entities/Order';

export class GetOrderByPaymentIntentIdUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(paymentIntentId: string): Promise<Order> {
    return await this.orderRepository.getByPaymentIntentId(paymentIntentId);
  }
}
