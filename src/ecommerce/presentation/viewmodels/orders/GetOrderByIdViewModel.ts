import { Order, UpdateOrderData } from '../../domain/entities/Order';
import { GetOrderByIdUseCase } from '../../application/usecases/orders';

export class GetOrderByIdViewModel {
  private state = {
    order: null as Order | null,
    loading: false,
    error: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private getOrderByIdUseCase: GetOrderByIdUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
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

  getState() {
    return { ...this.state };
  }
}
