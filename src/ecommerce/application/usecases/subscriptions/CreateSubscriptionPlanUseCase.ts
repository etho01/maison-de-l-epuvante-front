import { ISubscriptionPlanRepository } from '../../../domain/repositories/ISubscriptionPlanRepository';
import { SubscriptionPlan } from '../../../domain/entities/SubscriptionPlan';

export class CreateSubscriptionPlanUseCase {
  constructor(private subscriptionPlanRepository: ISubscriptionPlanRepository) {}

  async execute(data: Omit<SubscriptionPlan, 'id'>): Promise<SubscriptionPlan> {
    return await this.subscriptionPlanRepository.create(data);
  }
}
