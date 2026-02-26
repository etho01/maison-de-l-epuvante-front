import { Order, UpdateOrderData } from '../../domain/entities/Order';
import { GetOrderByIdUseCase } from '../../application/usecases/orders';

export class GetOrderByIdViewModel {
  private state = {
    order: null as Order | null,
    loading: false,
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
    this.state.loading = true;
    this.notify();

    try {
      this.state.order = await this.getOrderByIdUseCase.execute(id);
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  getState() {
    return { ...this.state };
  }
}
