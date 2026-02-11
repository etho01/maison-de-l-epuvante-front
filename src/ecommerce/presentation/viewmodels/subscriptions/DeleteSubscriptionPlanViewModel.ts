import { DeleteSubscriptionPlanUseCase } from '../../../application/usecases/subscriptions';

export class DeleteSubscriptionPlanViewModel {
  private state = {
    loading: false,
    error: null as string | null,
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

  async deletePlan(id: number): Promise<boolean> {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      await this.deleteSubscriptionPlanUseCase.execute(id);
      return true;
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors de la suppression du plan d\'abonnement';
      return false;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  resetState() {
    this.state.error = null;
    this.notify();
  }

  getState() {
    return { ...this.state };
  }
}
