import { SubscribeUseCase } from '../../application/usecases/subscriptions';
import { ApiError } from '@/src/shared/domain/ApiError';

export class SubscribeViewModel {
  private state = {
    subscribing: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private subscribeUseCase: SubscribeUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  subscribeToPlan(data: SubscriptionCreateData): Promise<void> {
    this.state.subscribing = true;
    this.notify();

    return this.subscribeUseCase.execute(data)
      .catch((error: ApiError) => {
        throw error;
      })
      .finally(() => {
        this.state.subscribing = false;
        this.notify();
      });
  }

  getState() {
    return { ...this.state };
  }
}
