import { Product } from '../../domain/entities/Product';
import { GetProductsUseCase } from '../../application/usecases/GetProductsUseCase';

export class ProductDetailViewModel {
  private state = {
    product: null as Product | null,
    loading: true,
    error: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getProductsUseCase: GetProductsUseCase,
    private slug: string,
    initialProduct?: Product
  ) {
    if (initialProduct) {
      this.state.product = initialProduct;
      this.state.loading = false;
    }
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async init() {
    await this.loadProduct();
  }

  async loadProduct() {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      // Rechercher le produit par slug
      const response = await this.getProductsUseCase.execute({ name: this.slug });
      const foundProduct = response['member'].find((p) => p.slug === this.slug);

      if (!foundProduct) {
        this.state.error = 'Produit non trouvé';
      } else {
        this.state.product = foundProduct;
      }
    } catch (err: any) {
      this.state.error = err.message || 'Une erreur est survenue';
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  getState() {
    return { ...this.state };
  }
}
