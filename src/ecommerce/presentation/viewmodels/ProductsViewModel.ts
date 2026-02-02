import { Product, ProductFilters } from '../../domain/entities/Product';
import { GetProductsUseCase } from '../../application/usecases/products';
import { Pagination } from '@/src/shared/domain/Pagination';

export class ProductsViewModel {
  private state = {
    products: [] as Product[],
    pagination: null as Pagination | null,
    loading: true,
    error: null as string | null,
    filters: {} as ProductFilters,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getProductsUseCase: GetProductsUseCase,
    initialProducts?: Product[],
    initialPagination?: Pagination
  ) {
    if (initialProducts) {
      this.state.products = initialProducts;
      this.state.loading = false;
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
    if (this.state.products) return;
    await this.loadProducts();
  }

  async loadProducts() {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      const productsData = await this.getProductsUseCase.execute(this.state.filters);
      this.state.products = productsData['member'];
    } catch (err: any) {
      this.state.error = err.message || 'Une erreur est survenue';
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  setFilter(key: string, value: any) {
    this.state.filters = {
      ...this.state.filters,
      [key]: value,
    };
    this.loadProducts();
  }

  setCategoryFilter(categoryId: number | undefined) {
    this.setFilter('category.id', categoryId);
  }

  setTypeFilter(type: string | undefined) {
    this.setFilter('type', type);
  }

  getState() {
    return { ...this.state };
  }
}
