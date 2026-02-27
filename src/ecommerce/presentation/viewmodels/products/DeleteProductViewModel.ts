import { DeleteProductUseCase } from "@/src/ecommerce/application/usecases";
import { ApiError } from '@/src/shared/domain/ApiError';


export class DeleteProductViewModel {
  private state = {
    loading: false,
    success: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private deleteProductUseCase: DeleteProductUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  deleteProduct(id: number): Promise<void> {
    this.state.loading = true;
    this.state.success = false;
    this.notify();

    return this.deleteProductUseCase.execute(id)
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
