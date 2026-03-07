import { Delivery } from '../../../domain/entities/Devivery';
import { PaginatedResponse, Pagination } from '@/src/shared/domain/Pagination';
import { GetDeliveriesUseCase } from '../../../application/usecases/deliveries';
import { ApiError } from '@/src/shared/domain/ApiError';

export class GetDeliveriesViewModel {
  private state = {
    deliveries: [] as Delivery[],
    pagination: null as PaginatedResponse<Delivery>['pagination'] | null,
    loading: false,
    error: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getDeliveriesUseCase: GetDeliveriesUseCase,
    initialDeliveries?: Delivery[],
    initialPagination?: Pagination
  ) {
    if (initialDeliveries) {
      this.state.deliveries = initialDeliveries;
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

  async loadDeliveries(page?: number): Promise<void> {
    this.state.loading = true;
    this.state.error = null;
    this.notify();

    try {
      const response = await this.getDeliveriesUseCase.execute(page);
      this.state.deliveries = response.member;
      this.state.pagination = response.pagination;
      this.state.loading = false;
      this.notify();
    } catch (error) {
      this.state.error = error instanceof ApiError ? error.message : 'Une erreur est survenue';
      this.state.loading = false;
      this.notify();
      throw error;
    }
  }

  getState() {
    return { ...this.state };
  }
}
