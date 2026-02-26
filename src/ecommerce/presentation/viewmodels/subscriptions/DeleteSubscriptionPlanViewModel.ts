import { DeleteSubscriptionPlanUseCase } from '../../../application/usecases/subscriptions';

export class DeleteSubscriptionPlanViewModel {
  private state = {
    loading: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private deleteSubscriptionPlanUseCase: DeleteSubscriptionPlanUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async deletePlan(id: number): Promise<void> {
    this.state.loading = true;
    this.notify();

    try {
      await this.deleteSubscriptionPlanUseCase.execute(id);
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  resetState() {
    this.notify();
  }

  getState() {
    return { ...this.state };
  }
}
