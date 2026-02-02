import { ISubscriptionPlanRepository } from '../../domain/repositories/ISubscriptionPlanRepository';
import { SubscriptionPlan } from '../../domain/entities/SubscriptionPlan';

export class GetSubscriptionPlansUseCase {
  constructor(private subscriptionPlanRepository: ISubscriptionPlanRepository) {}

  async execute(): Promise<SubscriptionPlan[]> {
    return await this.subscriptionPlanRepository.getSubscriptionPlans();
  }
}
