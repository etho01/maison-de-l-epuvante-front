import { UpdateCategoryData } from '../../domain/entities/Category';
import { UpdateCategoryUseCase } from '../../application/usecases/categories';

export class UpdateCategoryViewModel {
  private state = {
    loading: false,
    success: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private updateCategoryUseCase: UpdateCategoryUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async updateCategory(id: number, data: UpdateCategoryData): Promise<void> {
    this.state.loading = true;
    this.state.success = false;
    this.notify();

    try {
      await this.updateCategoryUseCase.execute(id, data);
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
