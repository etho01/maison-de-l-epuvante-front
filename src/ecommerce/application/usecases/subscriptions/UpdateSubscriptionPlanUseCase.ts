import { ISubscriptionPlanRepository } from '../../../domain/repositories/ISubscriptionPlanRepository';
import { SubscriptionPlan, UpdateSubscriptionPlanData } from '../../../domain/entities/SubscriptionPlan';

export class UpdateSubscriptionPlanUseCase {
  constructor(private subscriptionPlanRepository: ISubscriptionPlanRepository) {}

  async execute(id: number, data: UpdateSubscriptionPlanData): Promise<SubscriptionPlan> {
    return await this.subscriptionPlanRepository.update(id, data);
  }
}
