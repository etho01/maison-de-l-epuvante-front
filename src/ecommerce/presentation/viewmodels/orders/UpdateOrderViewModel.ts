import { Order, UpdateOrderData } from '../../domain/entities/Order';
import { UpdateOrderUseCase } from '../../application/usecases/orders';

export class UpdateOrderViewModel {
  private state = {
    loading: false,
    success: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private updateOrderUseCase: UpdateOrderUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async updateOrder(id: number, data: UpdateOrderData): Promise<Order> {
    this.state.loading = true;
    this.state.success = false;
    this.notify();

    try {
      const updatedOrder = await this.updateOrderUseCase.execute(id, data);
      this.state.success = true;
      return updatedOrder;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  resetState() {
    this.state.success = false;
    this.notify();
  }

  getState() {
    return { ...this.state };
  }
}
