import { Category } from '../../../domain/entities/Category';
import { GetCategoriesUseCase } from '../../../application/usecases/categories';
import { Pagination } from '@/src/shared/domain/Pagination';
import { GetCategoriesFilter } from '../../../application/usecases/categories/GetCategoriesUseCase';
import { ApiError } from '@/src/shared/domain/ApiError';

export class GetCategoriesViewModel {
  private state = {
    categories: [] as Category[],
    pagination: null as Pagination | null,
    loading: false,
    filter: {} as GetCategoriesFilter
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getCategoriesUseCase: GetCategoriesUseCase,
    initialCategories?: Category[],
    initialPagination?: Pagination
  ) {
    if (initialCategories) {
      this.state.categories = initialCategories;
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
    if (this.state.categories.length > 0) return Promise.resolve();
    return this.loadCategories();
  }

  loadCategories(): Promise<void> {
    this.state.loading = true;
    this.notify();

    return this.getCategoriesUseCase.execute(this.state.filter)
      .then((response) => {
        this.state.categories = response.member;
        this.state.pagination = response.pagination;
      })
      .catch((error: ApiError) => {
        throw error;
      })
      .finally(() => {
        this.state.loading = false;
        this.notify();
      });
  }

  setFilter(filter: GetCategoriesFilter) 
  {
    this.state.filter = {
      ...this.state.filter,
      ...filter
    };
    this.loadCategories();
  }

  getState() {
    return { ...this.state };
  }
}
