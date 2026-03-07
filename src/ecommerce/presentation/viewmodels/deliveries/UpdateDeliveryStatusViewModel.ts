import { Delivery, DeliveryStatus } from '../../../domain/entities/Devivery';
import { UpdateDeliveryStatusUseCase } from '../../../application/usecases/deliveries';
import { ApiError } from '@/src/shared/domain/ApiError';

export class UpdateDeliveryStatusViewModel {
  private state = {
    loading: false,
    success: false,
    error: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private updateDeliveryStatusUseCase: UpdateDeliveryStatusUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async updateStatus(id: number, status: DeliveryStatus): Promise<Delivery> {
    this.state.loading = true;
    this.state.success = false;
    this.state.error = null;
    this.notify();

    try {
      const updatedDelivery = await this.updateDeliveryStatusUseCase.execute(id, status);
      this.state.success = true;
      this.state.loading = false;
      this.notify();
      return updatedDelivery;
    } catch (error) {
      this.state.error = error instanceof ApiError ? error.message : 'Une erreur est survenue';
      this.state.loading = false;
      this.notify();
      throw error;
    }
  }

  resetState() {
    this.state.success = false;
    this.state.error = null;
    this.notify();
  }

  getState() {
    return { ...this.state };
  }
}
