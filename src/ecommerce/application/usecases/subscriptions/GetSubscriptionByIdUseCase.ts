import { ISubscriptionRepository } from '../../../domain/repositories/ISubscriptionRepository';
import { Subscription } from '../../../domain/entities/Subscription';

export class GetSubscriptionByIdUseCase {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async execute(id: number): Promise<Subscription> {
    return await this.subscriptionRepository.getById(id);
  }
}
