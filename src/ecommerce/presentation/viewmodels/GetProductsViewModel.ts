import { Product, ProductFilters } from '../../domain/entities/Product';
import { GetProductsUseCase } from '../../application/usecases/products';
import { Pagination } from '@/src/shared/domain/Pagination';

export class GetProductsViewModel {
  private state = {
    products: [] as Product[],
    pagination: null as Pagination | null,
    loading: false,
    error: null as string | null,
    filters: {
      page: 1,
    } as ProductFilters,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getProductsUseCase: GetProductsUseCase,
    initialProducts?: Product[],
    initialPagination?: Pagination
  ) {
    if (initialProducts) {
      this.state.products = initialProducts;
    }
    if (initialPagination) {
      this.state.pagination = initialPagination;
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
    if (this.state.products.length > 0) return;
    await this.loadProducts();
  }

  async loadProducts() {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      const response = await this.getProductsUseCase.execute(this.state.filters);
      this.state.products = response.member;
      this.state.pagination = response.pagination;
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors du chargement des produits';
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  setFilters(filters: Partial<ProductFilters>) {
    this.state.filters = { ...this.state.filters, ...filters };
    this.loadProducts();
  }

  getState() {
    return { ...this.state };
  }
}
