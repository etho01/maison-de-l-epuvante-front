import { Category } from '../../domain/entities/Category';
import { GetAllCategoriesUseCase } from '../../application/usecases/categories';

export class GetAllCategoriesViewModel {
  private state = {
    categories: [] as Category[],
    loading: false,
    error: null as string | null,
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
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      this.state.categories = await this.getAllCategoriesUseCase.execute();
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
