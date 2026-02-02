import { SubscribeUseCase } from '../../application/usecases/SubscribeUseCase';

export class SubscribeViewModel {
  private state = {
    subscribing: false,
    error: null as string | null,
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

  async subscribeToPlan(data: SubscriptionCreateData): Promise<boolean> {
    try {
      this.state.subscribing = true;
      this.state.error = null;
      this.notify();

      await this.subscribeUseCase.execute(data);
      return true;
    } catch (err: any) {
      this.state.error = err.message || 'Une erreur est survenue';
      return false;
    } finally {
      this.state.subscribing = false;
      this.notify();
    }
  }

  getState() {
    return { ...this.state };
  }
}
