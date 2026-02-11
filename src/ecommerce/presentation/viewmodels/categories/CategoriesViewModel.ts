import { Category } from '../../domain/entities/Category';
import { GetCategoriesUseCase } from '../../application/usecases/categories';

export class CategoriesViewModel {
  private state = {
    categories: [] as Category[],
    loading: true,
    error: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getCategoriesUseCase: GetCategoriesUseCase,
    initialCategories?: Category[]
  ) {
    if (initialCategories) {
      this.state.categories = initialCategories;
      this.state.loading = false;
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
    await this.loadCategories();
  }

  async loadCategories() {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      const categoriesData = await this.getCategoriesUseCase.execute();
      this.state.categories = categoriesData['member'];
    } catch (err: any) {
      this.state.error = err.message || 'Une erreur est survenue';
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  getState() {
    return { ...this.state };
  }
}
