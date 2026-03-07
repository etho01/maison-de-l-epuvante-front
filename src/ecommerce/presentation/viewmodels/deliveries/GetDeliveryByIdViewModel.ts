import { Delivery } from '../../../domain/entities/Devivery';
import { GetDeliveryByIdUseCase } from '../../../application/usecases/deliveries';
import { ApiError } from '@/src/shared/domain/ApiError';

export class GetDeliveryByIdViewModel {
  private state = {
    delivery: null as Delivery | null,
    loading: false,
    error: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private getDeliveryByIdUseCase: GetDeliveryByIdUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async loadDelivery(id: number): Promise<void> {
    this.state.loading = true;
    this.state.error = null;
    this.notify();

    try {
      const delivery = await this.getDeliveryByIdUseCase.execute(id);
      this.state.delivery = delivery;
      this.state.loading = false;
      this.notify();
    } catch (error) {
      this.state.error = error instanceof ApiError ? error.message : 'Une erreur est survenue';
      this.state.loading = false;
      this.notify();
      throw error;
    }
  }

  getState() {
    return { ...this.state };
  }
}
