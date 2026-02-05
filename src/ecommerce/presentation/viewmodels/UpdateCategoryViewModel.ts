import { UpdateCategoryData } from '../../domain/entities/Category';
import { UpdateCategoryUseCase } from '../../application/usecases/categories';

export class UpdateCategoryViewModel {
  private state = {
    loading: false,
    error: null as string | null,
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

  async updateCategory(id: number, data: UpdateCategoryData): Promise<boolean> {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.state.success = false;
      this.notify();

      await this.updateCategoryUseCase.execute(id, data);
      this.state.success = true;
      return true;
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors de la mise à jour de la catégorie';
      this.state.success = false;
      return false;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  resetState() {
    this.state.error = null;
    this.state.success = false;
    this.notify();
  }

  getState() {
    return { ...this.state };
  }
}
