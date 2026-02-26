import { Category } from '../../domain/entities/Category';
import { GetAllCategoriesUseCase } from '../../application/usecases/categories';

export class GetAllCategoriesViewModel {
  private state = {
    categories: [] as Category[],
    loading: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private getAllCategoriesUseCase: GetAllCategoriesUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async loadCategories() {
    this.state.loading = true;
    this.notify();

    try {
      this.state.categories = await this.getAllCategoriesUseCase.execute();
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  getState() {
    return { ...this.state };
  }
}
