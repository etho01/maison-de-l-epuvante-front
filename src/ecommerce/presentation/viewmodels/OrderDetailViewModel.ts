import { Order } from '../../domain/entities/Order';
import { GetOrderByIdUseCase } from '../../application/usecases/GetOrderByIdUseCase';

export class OrderDetailViewModel {
  private state = {
    order: null as Order | null,
    loading: true,
    error: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getOrderByIdUseCase: GetOrderByIdUseCase,
    private orderId: number,
    initialOrder?: Order
  ) {
    if (initialOrder) {
      this.state.order = initialOrder;
      this.state.loading = false;
    }
  }

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

  async loadOrder() {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      const orderData = await this.getOrderByIdUseCase.execute(this.orderId);
      this.state.order = orderData;
    } catch (err: any) {
      this.state.error = err.message || 'Une erreur est survenue';
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  getState() {
    return { ...this.state };
  }
}
