import { Order } from '../../domain/entities/Order';
import { GetOrdersUseCase } from '../../application/usecases/orders';
import { Pagination } from '@/src/shared/domain/Pagination';

export class GetOrdersViewModel {
  private state = {
    orders: [] as Order[],
    pagination: null as Pagination | null,
    loading: false,
    error: null as string | null,
    currentPage: 1,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getOrdersUseCase: GetOrdersUseCase,
    initialOrders?: Order[],
    initialPagination?: Pagination
  ) {
    if (initialOrders) {
      this.state.orders = initialOrders;
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
    if (this.state.orders.length > 0) return;
    await this.loadOrders();
  }

  async loadOrders(page?: number) {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      const pageToLoad = page || this.state.currentPage;
      const response = await this.getOrdersUseCase.execute(pageToLoad);
      this.state.orders = response.member;
      this.state.pagination = response.pagination;
      this.state.currentPage = pageToLoad;
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors du chargement des commandes';
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  getState() {
    return { ...this.state };
  }
}
