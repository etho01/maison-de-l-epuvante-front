import { DeleteProductUseCase } from "@/src/ecommerce/application/usecases";


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

  async deleteProduct(id: number): Promise<void> {
    this.state.loading = true;
    this.state.success = false;
    this.notify();

    try {
      await this.deleteProductUseCase.execute(id);
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
