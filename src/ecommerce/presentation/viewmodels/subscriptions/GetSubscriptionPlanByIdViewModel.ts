import { SubscriptionPlan } from '../../../domain/entities/SubscriptionPlan';
import { GetSubscriptionPlanByIdUseCase } from '../../../application/usecases/subscriptions';

export class GetSubscriptionPlanByIdViewModel {
  private state = {
    plan: null as SubscriptionPlan | null,
    loading: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private getSubscriptionPlanByIdUseCase: GetSubscriptionPlanByIdUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  loadPlan(id: number): Promise<void> {
    this.state.loading = true;
    this.notify();

    return this.getSubscriptionPlanByIdUseCase.execute(id)
      .then((plan) => {
        this.state.plan = plan;
      })
      .catch((err: ApiError) => {
        this.state.plan = null;
        throw err;
      })
      .finally(() => {
        this.state.loading = false;
        this.notify();
      });
  }

  getState() {
    return { ...this.state };
  }
}
