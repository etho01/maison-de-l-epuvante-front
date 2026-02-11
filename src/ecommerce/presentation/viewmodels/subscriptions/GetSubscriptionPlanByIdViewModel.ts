import { SubscriptionPlan } from '../../../domain/entities/SubscriptionPlan';
import { GetSubscriptionPlanByIdUseCase } from '../../../application/usecases/subscriptions';

export class GetSubscriptionPlanByIdViewModel {
  private state = {
    plan: null as SubscriptionPlan | null,
    loading: false,
    error: null as string | null,
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

  async loadPlan(id: number): Promise<void> {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      const plan = await this.getSubscriptionPlanByIdUseCase.execute(id);
      this.state.plan = plan;
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors du chargement du plan d\'abonnement';
      this.state.plan = null;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  getState() {
    return { ...this.state };
  }
}
