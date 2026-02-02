import { Order } from '../../domain/entities/Order';
import { GetOrdersUseCase } from '../../application/usecases/GetOrdersUseCase';

export class OrdersViewModel {
  private state = {
    orders: [] as Order[],
    loading: true,
    error: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private getOrdersUseCase: GetOrdersUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async init() {
    await this.loadOrders();
  }

  async loadOrders() {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      const response = await this.getOrdersUseCase.execute();
      this.state.orders = response['member'];
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
