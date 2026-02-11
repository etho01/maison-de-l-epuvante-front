import { ISubscriptionPlanRepository } from '../../../domain/repositories/ISubscriptionPlanRepository';
import { SubscriptionPlan } from '../../../domain/entities/SubscriptionPlan';

export class GetSubscriptionPlanByIdUseCase {
  constructor(private subscriptionPlanRepository: ISubscriptionPlanRepository) {}

  async execute(id: number): Promise<SubscriptionPlan> {
    return await this.subscriptionPlanRepository.getById(id);
  }
}
