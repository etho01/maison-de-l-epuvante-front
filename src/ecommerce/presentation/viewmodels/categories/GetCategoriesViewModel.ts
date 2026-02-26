import { Category } from '../../domain/entities/Category';
import { GetCategoriesUseCase } from '../../application/usecases/categories';
import { Pagination } from '@/src/shared/domain/Pagination';
import { GetCategoriesFilter } from '../../application/usecases/categories/GetCategoriesUseCase';

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

  async init() {
    if (this.state.categories.length > 0) return;
    await this.loadCategories();
  }

  async loadCategories() {
    this.state.loading = true;
    this.notify();

    try {
      const response = await this.getCategoriesUseCase.execute(this.state.filter);
      this.state.categories = response.member;
      this.state.pagination = response.pagination;
    } finally {
      this.state.loading = false;
      this.notify();
    }
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
