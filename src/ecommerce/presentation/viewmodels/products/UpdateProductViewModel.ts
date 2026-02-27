import { UpdateProductUseCase } from '@/src/ecommerce/application/usecases';
import { UpdateProductData } from '@/src/ecommerce/domain/entities/Product';
import { ApiError } from '@/src/shared/domain/ApiError';

export class UpdateProductViewModel {
  private state = {
    loading: false,
    success: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private updateProductUseCase: UpdateProductUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  updateProduct(id: number, data: UpdateProductData): Promise<void> {
    this.state.loading = true;
    this.state.success = false;
    this.notify();

    return this.updateProductUseCase.execute(id, data)
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
