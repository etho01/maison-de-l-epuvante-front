import { Order } from '../../domain/entities/Order';
import { GetOrdersUseCase } from '../../application/usecases/orders';
import { Pagination } from '@/src/shared/domain/Pagination';

export class OrdersViewModel {
  private state = {
    orders: [] as Order[],
    loading: true,
    error: null as string | null,
    pagination: null as Pagination | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getOrdersUseCase: GetOrdersUseCase,
    initialOrders?: Order[],
    initialPagination?: Pagination
  ) {
    if (initialOrders) {
      this.state.orders = initialOrders;
      this.state.loading = false;
    }

    if (initialPagination) {
      this.state.pagination = initialPagination;
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
    if (!this.state.loading) return;
    await this.loadOrders();
  }

  async loadOrders() {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      const response = await this.getOrdersUseCase.execute();
      this.state.orders = response['member'];
      this.state.pagination = response['pagination'];
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
