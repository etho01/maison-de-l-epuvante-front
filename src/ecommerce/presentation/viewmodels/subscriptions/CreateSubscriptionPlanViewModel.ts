import { CreateSubscriptionPlanData } from '../../../domain/entities/SubscriptionPlan';
import { CreateSubscriptionPlanUseCase } from '../../../application/usecases/subscriptions';

export class CreateSubscriptionPlanViewModel {
  private state = {
    loading: false,
    error: null as string | null,
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

  async createPlan(data: CreateSubscriptionPlanData): Promise<boolean> {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.state.success = false;
      this.notify();

      await this.createSubscriptionPlanUseCase.execute(data);
      this.state.success = true;
      return true;
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors de la création du plan d\'abonnement';
      this.state.success = false;
      return false;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  resetState() {
    this.state.error = null;
    this.state.success = false;
    this.notify();
  }

  getState() {
    return { ...this.state };
  }
}
