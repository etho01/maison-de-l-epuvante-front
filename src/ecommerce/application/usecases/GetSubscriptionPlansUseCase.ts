import { ISubscriptionPlanRepository } from '../../domain/repositories/ISubscriptionPlanRepository';
import { SubscriptionPlan } from '../../domain/entities/SubscriptionPlan';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

export class GetSubscriptionPlansUseCase {
  constructor(private subscriptionPlanRepository: ISubscriptionPlanRepository) {}

  async execute(): Promise<PaginatedResponse<SubscriptionPlan>> {
    return await this.subscriptionPlanRepository.getSubscriptionPlans();
  }
}
