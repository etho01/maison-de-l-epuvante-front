import { UpdateSubscriptionPlanData } from '../../../domain/entities/SubscriptionPlan';
import { UpdateSubscriptionPlanUseCase } from '../../../application/usecases/subscriptions';

export class UpdateSubscriptionPlanViewModel {
  private state = {
    loading: false,
    success: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private updateSubscriptionPlanUseCase: UpdateSubscriptionPlanUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async updatePlan(id: number, data: UpdateSubscriptionPlanData): Promise<void> {
    this.state.loading = true;
    this.state.success = false;
    this.notify();

    try {
      await this.updateSubscriptionPlanUseCase.execute(id, data);
      this.state.success = true;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  resetState() {
    this.state.success = false;
    this.notify();
  }

  getState() {
    return { ...this.state };
  }
}
