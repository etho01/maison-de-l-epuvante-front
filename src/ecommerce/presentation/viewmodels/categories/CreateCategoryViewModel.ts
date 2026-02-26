import { CreateCategoryData } from '../../domain/entities/Category';
import { CreateCategoryUseCase } from '../../application/usecases/categories';

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

  async createCategory(data: CreateCategoryData): Promise<void> {
    this.state.loading = true;
    this.state.success = false;
    this.notify();

    try {
      await this.createCategoryUseCase.execute(data);
      this.state.success = true;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  resetState() {
    this.state.success = false;
    this.notify();
  }

  getState() {
    return { ...this.state };
  }
}
