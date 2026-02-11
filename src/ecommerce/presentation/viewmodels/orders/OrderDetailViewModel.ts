import { Order, UpdateOrderData } from '../../domain/entities/Order';
import { GetOrderByIdUseCase, UpdateOrderUseCase } from '../../application/usecases/orders';

export class OrderDetailViewModel {
  private state = {
    order: null as Order | null,
    loading: false,
    error: null as string | null,
    success: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getOrderByIdUseCase: GetOrderByIdUseCase,
    private updateOrderUseCase: UpdateOrderUseCase
  ) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async init() {
    await this.loadOrder();
  }

  async loadOrder(id: number) {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      this.state.order = await this.getOrderByIdUseCase.execute(id);
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors du chargement de la commande';
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  async updateOrder(id: number, data: UpdateOrderData): Promise<boolean> {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.state.success = false;
      this.notify();

      const updatedOrder = await this.updateOrderUseCase.execute(id, data);
      this.state.order = updatedOrder;
      this.state.success = true;
      return true;
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors de la mise à jour de la commande';
      this.state.success = false;
      return false;
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
