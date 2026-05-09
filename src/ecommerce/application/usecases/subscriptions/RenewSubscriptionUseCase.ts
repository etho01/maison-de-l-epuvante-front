import { ISubscriptionRepository } from '../../../domain/repositories/ISubscriptionRepository';
import { RenewSubscriptionData, Subscription } from '../../../domain/entities/Subscription';

export class RenewSubscriptionUseCase {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async execute(id: number, data: RenewSubscriptionData): Promise<Subscription> {
    return await this.subscriptionRepository.renew(id, data);
  }
}
