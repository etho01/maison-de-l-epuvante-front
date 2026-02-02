import { ISubscriptionRepository } from '../../../domain/repositories/ISubscriptionRepository';
import { Subscription, SubscribeData } from '../../../domain/entities/Subscription';

export class SubscribeUseCase {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async execute(data: SubscribeData): Promise<Subscription> {
    return await this.subscriptionRepository.subscribe(data);
  }
}
