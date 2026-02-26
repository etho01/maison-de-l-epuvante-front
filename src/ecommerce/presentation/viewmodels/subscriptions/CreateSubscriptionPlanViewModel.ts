import { CreateSubscriptionPlanData } from '../../../domain/entities/SubscriptionPlan';
import { CreateSubscriptionPlanUseCase } from '../../../application/usecases/subscriptions';

export class CreateSubscriptionPlanViewModel {
  private state = {
    loading: false,
    success: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private createSubscriptionPlanUseCase: CreateSubscriptionPlanUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async createPlan(data: CreateSubscriptionPlanData): Promise<void> {
    this.state.loading = true;
    this.state.success = false;
    this.notify();

    try {
      await this.createSubscriptionPlanUseCase.execute(data);
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
