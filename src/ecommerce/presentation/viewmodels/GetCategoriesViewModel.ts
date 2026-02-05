import { Category } from '../../domain/entities/Category';
import { GetCategoriesUseCase } from '../../application/usecases/categories';
import { Pagination } from '@/src/shared/domain/Pagination';

export class GetCategoriesViewModel {
  private state = {
    categories: [] as Category[],
    pagination: null as Pagination | null,
    loading: false,
    error: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getCategoriesUseCase: GetCategoriesUseCase,
    initialCategories?: Category[]
  ) {
    if (initialCategories) {
      this.state.categories = initialCategories;
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
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      const response = await this.getCategoriesUseCase.execute();
      this.state.categories = response.member;
      this.state.pagination = response.pagination;
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors du chargement des catégories';
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  getState() {
    return { ...this.state };
  }
}
