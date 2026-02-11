import { ISubscriptionPlanRepository } from '../../../domain/repositories/ISubscriptionPlanRepository';

export class DeleteSubscriptionPlanUseCase {
  constructor(private subscriptionPlanRepository: ISubscriptionPlanRepository) {}

  async execute(id: number): Promise<void> {
    return await this.subscriptionPlanRepository.delete(id);
  }
}
