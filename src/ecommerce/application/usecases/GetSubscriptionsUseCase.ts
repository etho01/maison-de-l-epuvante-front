import { ISubscriptionRepository } from '../../domain/repositories/ISubscriptionRepository';
import { Subscription } from '../../domain/entities/Subscription';
import { PaginatedResponse } from '../../domain/repositories/IProductRepository';

export class GetSubscriptionsUseCase {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async execute(page?: number): Promise<PaginatedResponse<Subscription>> {
    return await this.subscriptionRepository.getAll(page);
  }
}
