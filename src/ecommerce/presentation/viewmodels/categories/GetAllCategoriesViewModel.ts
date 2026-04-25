import { Category } from '../../../domain/entities/Category';
import { GetAllCategoriesUseCase } from '../../../application/usecases/categories';
import { ApiError } from '@/src/shared/domain/ApiError';

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

  loadCategories(): Promise<void> {
    this.state.loading = true;
    this.notify();

    return this.getAllCategoriesUseCase.execute()
      .then((categories: any) => {
        this.state.categories = categories;
      })
      .catch((error: ApiError) => {
        throw error;
      })
      .finally(() => {
        this.state.loading = false;
        this.notify();
      });
  }

  getState() {
    return { ...this.state };
  }
}
