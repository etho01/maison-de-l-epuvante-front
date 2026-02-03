import { SubscriptionPlan } from '../../domain/entities/SubscriptionPlan';
import { GetSubscriptionPlansUseCase, SubscriptionPlansFilters } from '../../application/usecases/subscriptions';
import { Pagination } from '@/src/shared/domain/Pagination';

export class SubscriptionPlansViewModel {
  private state = {
    plans: [] as SubscriptionPlan[],
    pagination: null as Pagination | null,
    loading: true,
    error: null as string | null,
    filters: {
      page: 1,
    } as SubscriptionPlansFilters,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getSubscriptionPlansUseCase: GetSubscriptionPlansUseCase,
    initialPlans?: SubscriptionPlan[],
    initialPagination?: Pagination
  ) {
    if (initialPlans) {
      this.state.plans = initialPlans;
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
    if (this.state.plans) return;
    await this.loadPlans();
  }

  async loadPlans() {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      const plansData = await this.getSubscriptionPlansUseCase.execute(this.state.filters);
      this.state.plans = plansData.member.filter((plan) => plan.active);
      this.state.pagination = plansData.pagination;
    } catch (err: any) {
      this.state.error = err.message || 'Une erreur est survenue';
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  setFilter(key: keyof SubscriptionPlansFilters, value: any) {
    this.state.filters = {
      ...this.state.filters,
      [key]: value,
    };
    this.loadPlans();
  }

  getState() {
    return { ...this.state };
  }
}
