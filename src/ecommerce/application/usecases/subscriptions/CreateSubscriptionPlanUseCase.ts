import { ISubscriptionPlanRepository } from '../../../domain/repositories/ISubscriptionPlanRepository';
import { SubscriptionPlan, CreateSubscriptionPlanData } from '../../../domain/entities/SubscriptionPlan';

export class CreateSubscriptionPlanUseCase {
  constructor(private subscriptionPlanRepository: ISubscriptionPlanRepository) {}

  async execute(data: CreateSubscriptionPlanData): Promise<SubscriptionPlan> {
    return await this.subscriptionPlanRepository.create(data);
  }
}
