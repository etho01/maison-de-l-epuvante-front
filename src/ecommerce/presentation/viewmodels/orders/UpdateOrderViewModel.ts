import { Order, UpdateOrderData } from '../../domain/entities/Order';
import { UpdateOrderUseCase } from '../../application/usecases/orders';

export class UpdateOrderViewModel {
  private state = {
    loading: false,
    error: null as string | null,
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

  async updateOrder(id: number, data: UpdateOrderData): Promise<Order | null> {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.state.success = false;
      this.notify();

      const updatedOrder = await this.updateOrderUseCase.execute(id, data);
      this.state.success = true;
      return updatedOrder;
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors de la mise à jour de la commande';
      this.state.success = false;
      return null;
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
