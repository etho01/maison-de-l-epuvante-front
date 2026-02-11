import { SubscriptionPlan } from '../../../domain/entities/SubscriptionPlan';
import { Pagination } from '@/src/shared/domain/Pagination';
import { GetSubscriptionPlansUseCase, SubscriptionPlansFilters } from '../../../application/usecases/subscriptions';

export class GetSubscriptionPlansViewModel {
  private state = {
    plans: [] as SubscriptionPlan[],
    loading: false,
    error: null as string | null,
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

  async loadPlans(page: number = 1): Promise<void> {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      const result = await this.getSubscriptionPlansUseCase.execute({
        ...this.state.filters,
        page,
      });
      this.state.plans = result.member;
      this.state.pagination = result.pagination;
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors du chargement des plans d\'abonnement';
      this.state.plans = [];
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  setFilters(filters: Partial<SubscriptionPlansFilters>) {
    this.state.filters = { ...this.state.filters, ...filters };
    this.loadPlans();
  }

  getState() {
    return { ...this.state };
  }
}
