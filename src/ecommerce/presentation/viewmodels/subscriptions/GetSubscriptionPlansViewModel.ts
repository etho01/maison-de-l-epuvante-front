import { SubscriptionPlan } from '../../../domain/entities/SubscriptionPlan';
import { Pagination } from '@/src/shared/domain/Pagination';
import { GetSubscriptionPlansUseCase, SubscriptionPlansFilters } from '../../../application/usecases/subscriptions';
import { ApiError } from '@/src/shared/domain/ApiError';

export class GetSubscriptionPlansViewModel {
  private state = {
    plans: [] as SubscriptionPlan[],
    loading: false,
    pagination: null as Pagination | null,
    filters: {} as SubscriptionPlansFilters,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getSubscriptionPlansUseCase: GetSubscriptionPlansUseCase,
    initialPlans?: SubscriptionPlan[],
    initialPagination?: Pagination
  ) {
    if (initialPlans) {
      this.state.plans = initialPlans;
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
    if (this.state.plans.length > 0) return Promise.resolve();
    return this.loadPlans();
  }

  loadPlans(page: number = 1): Promise<void> {
    this.state.loading = true;
    this.notify();

    return this.getSubscriptionPlansUseCase.execute({
      ...this.state.filters,
      page,
    })
      .then((result) => {
        this.state.plans = result.member;
        this.state.pagination = result.pagination;
      })
      .catch((err: ApiError) => {
        this.state.plans = [];
        throw err;
      })
      .finally(() => {
        this.state.loading = false;
        this.notify();
      });
  }

  setFilters(filters: Partial<SubscriptionPlansFilters>) {
    this.state.filters = { ...this.state.filters, ...filters };
    this.loadPlans();
  }

  getState() {
    return { ...this.state };
  }
}
