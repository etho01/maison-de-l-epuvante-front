import { CreateProductUseCase } from "@/src/ecommerce/application/usecases";
import { CreateProductData } from "@/src/ecommerce/domain/entities/Product";


export class CreateProductViewModel {
  private state = {
    loading: false,
    success: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private createProductUseCase: CreateProductUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async createProduct(data: CreateProductData): Promise<void> {
    this.state.loading = true;
    this.state.success = false;
    this.notify();

    try {
      await this.createProductUseCase.execute(data);
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
