import { SubscribeUseCase } from '../../application/usecases/subscriptions';

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

  async subscribeToPlan(data: SubscriptionCreateData): Promise<void> {
    this.state.subscribing = true;
    this.notify();

    try {
      await this.subscribeUseCase.execute(data);
    } finally {
      this.state.subscribing = false;
      this.notify();
    }
  }

  getState() {
    return { ...this.state };
  }
}
