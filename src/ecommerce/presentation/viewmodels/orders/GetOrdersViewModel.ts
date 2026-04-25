import { Order, OrderStatus } from '../../../domain/entities/Order';
import { GetOrdersUseCase } from '../../../application/usecases/orders';
import { OrderFilters } from '../../../domain/repositories/IOrderRepository';
import { Pagination } from '@/src/shared/domain/Pagination';
import { ApiError } from '@/src/shared/domain/ApiError';

export class GetOrdersViewModel {
  private state = {
    orders: [] as Order[],
    pagination: null as Pagination | null,
    loading: false,
    currentPage: 1,
    currentStatus: null as OrderStatus | null,
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

  loadOrders(page?: number, status?: OrderStatus | null): Promise<void> {
    this.state.loading = true;
    this.notify();

    const pageToLoad = page || this.state.currentPage;
    const statusToFilter = status !== undefined ? status : this.state.currentStatus;
    
    const filters: OrderFilters = {
      page: pageToLoad,
    };
    
    if (statusToFilter) {
      filters.status = statusToFilter;
    }

    return this.getOrdersUseCase.execute(filters)
      .then((response) => {
        this.state.orders = response.member;
        this.state.pagination = response.pagination;
        this.state.currentPage = pageToLoad;
        this.state.currentStatus = statusToFilter;
      })
      .catch((error: ApiError) => {
        throw error;
      })
      .finally(() => {
        this.state.loading = false;
        this.notify();
      });
  }

  setStatus(status: OrderStatus | null): Promise<void> {
    return this.loadOrders(1, status);
  }

  getState() {
    return { ...this.state };
  }
}
