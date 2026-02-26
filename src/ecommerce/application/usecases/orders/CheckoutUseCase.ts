import { IOrderRepository } from '../../../domain/repositories/IOrderRepository';
import { CheckoutData, CheckoutResponse } from '../../../domain/entities/Order';

export class CheckoutUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(data: CheckoutData): Promise<CheckoutResponse> {
    return await this.orderRepository.checkout(data);
  }
}
