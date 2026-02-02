import { SubscriptionPlan } from '../../domain/entities/SubscriptionPlan';
import { GetSubscriptionPlansUseCase } from '../../application/usecases/GetSubscriptionPlansUseCase';

export class SubscriptionPlansViewModel {
  private state = {
    plans: [] as SubscriptionPlan[],
    loading: true,
    error: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private getSubscriptionPlansUseCase: GetSubscriptionPlansUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async init() {
    await this.loadPlans();
  }

  async loadPlans() {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      const plansData = await this.getSubscriptionPlansUseCase.execute();
      this.state.plans = plansData.filter((plan) => plan.active);
    } catch (err: any) {
      this.state.error = err.message || 'Une erreur est survenue';
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  getState() {
    return { ...this.state };
  }
}
