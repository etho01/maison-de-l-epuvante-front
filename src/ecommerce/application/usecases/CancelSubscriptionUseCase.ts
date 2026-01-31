import { ISubscriptionRepository } from '../../domain/repositories/ISubscriptionRepository';
import { Subscription } from '../../domain/entities/Subscription';

export class CancelSubscriptionUseCase {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async execute(id: number): Promise<Subscription> {
    return await this.subscriptionRepository.cancel(id);
  }
}
