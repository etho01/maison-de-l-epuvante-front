import { UpdateProductData } from '../../domain/entities/Product';
import { UpdateProductUseCase } from '../../application/usecases/products';

export class UpdateProductViewModel {
  private state = {
    loading: false,
    error: null as string | null,
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

  async updateProduct(id: number, data: UpdateProductData): Promise<boolean> {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.state.success = false;
      this.notify();

      await this.updateProductUseCase.execute(id, data);
      this.state.success = true;
      return true;
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors de la mise à jour du produit';
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
