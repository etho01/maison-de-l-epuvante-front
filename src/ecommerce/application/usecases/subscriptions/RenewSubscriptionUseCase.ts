import { ISubscriptionRepository } from '../../../domain/repositories/ISubscriptionRepository';
import { Subscription } from '../../../domain/entities/Subscription';

export class RenewSubscriptionUseCase {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async execute(id: number, data: any): Promise<Subscription> {
    return await this.subscriptionRepository.renew(id, data);
  }
}
