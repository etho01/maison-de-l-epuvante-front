import { DeleteSubscriptionPlanUseCase } from '../../../application/usecases/subscriptions';
import { ApiError } from '@/src/shared/domain/ApiError';

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

  deletePlan(id: number): Promise<void> {
    this.state.loading = true;
    this.notify();

    return this.deleteSubscriptionPlanUseCase.execute(id)
      .catch((error: ApiError) => {
        throw error;
      })
      .finally(() => {
        this.state.loading = false;
        this.notify();
      });
  }

  resetState() {
    this.notify();
  }

  getState() {
    return { ...this.state };
  }
}
