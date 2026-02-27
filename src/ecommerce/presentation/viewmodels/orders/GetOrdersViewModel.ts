import { Order } from '../../domain/entities/Order';
import { GetOrdersUseCase } from '../../application/usecases/orders';
import { Pagination } from '@/src/shared/domain/Pagination';
import { ApiError } from '@/src/shared/domain/ApiError';

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

  init(): Promise<void> {
    if (this.state.orders.length > 0) return Promise.resolve();
    return this.loadOrders();
  }

  loadOrders(page?: number): Promise<void> {
    this.state.loading = true;
    this.notify();

    const pageToLoad = page || this.state.currentPage;
    return this.getOrdersUseCase.execute(pageToLoad)
      .then((response) => {
        this.state.orders = response.member;
        this.state.pagination = response.pagination;
        this.state.currentPage = pageToLoad;
      })
      .catch((error: ApiError) => {
        throw error;
      })
      .finally(() => {
        this.state.loading = false;
        this.notify();
      });
  }

  getState() {
    return { ...this.state };
  }
}
