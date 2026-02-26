import { Order } from '../../domain/entities/Order';
import { GetOrdersUseCase } from '../../application/usecases/orders';
import { Pagination } from '@/src/shared/domain/Pagination';

export class GetOrdersViewModel {
  private state = {
    orders: [] as Order[],
    pagination: null as Pagination | null,
    loading: false,
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
    this.state.loading = true;
    this.notify();

    try {
      const pageToLoad = page || this.state.currentPage;
      const response = await this.getOrdersUseCase.execute(pageToLoad);
      this.state.orders = response.member;
      this.state.pagination = response.pagination;
      this.state.currentPage = pageToLoad;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  getState() {
    return { ...this.state };
  }
}
