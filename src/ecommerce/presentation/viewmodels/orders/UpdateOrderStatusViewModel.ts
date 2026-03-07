import { Order, OrderStatus } from '../../../domain/entities/Order';
import { UpdateOrderStatusUseCase } from '../../../application/usecases/orders/UpdateOrderStatusUseCase';
import { ApiError } from '@/src/shared/domain/ApiError';

export class UpdateOrderStatusViewModel {
  private state = {
    loading: false,
    success: false,
    error: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private updateOrderStatusUseCase: UpdateOrderStatusUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async updateStatus(orderId: number, status: OrderStatus): Promise<Order> {
    this.state.loading = true;
    this.state.success = false;
    this.state.error = null;
    this.notify();

    try {
      const updatedOrder = await this.updateOrderStatusUseCase.execute(orderId, status);
      this.state.success = true;
      this.state.loading = false;
      this.notify();
      return updatedOrder;
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
