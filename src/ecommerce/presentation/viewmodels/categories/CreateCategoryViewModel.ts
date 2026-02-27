import { CreateCategoryData } from '../../domain/entities/Category';
import { CreateCategoryUseCase } from '../../application/usecases/categories';
import { ApiError } from '@/src/shared/domain/ApiError';

export class CreateCategoryViewModel {
  private state = {
    loading: false,
    success: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  createCategory(data: CreateCategoryData): Promise<void> {
    this.state.loading = true;
    this.state.success = false;
    this.notify();

    return this.createCategoryUseCase.execute(data)
      .then(() => {
        this.state.success = true;
      })
      .catch((error: ApiError) => {
        throw error;
      })
      .finally(() => {
        this.state.loading = false;
        this.notify();
      });
  }

  resetState() {
    this.state.success = false;
    this.notify();
  }

  getState() {
    return { ...this.state };
  }
}
