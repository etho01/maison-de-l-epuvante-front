import { GetProductsUseCase } from '@/src/ecommerce/application/usecases';
import { Product, ProductFilters, ProductType } from '@/src/ecommerce/domain/entities/Product';
import { Pagination } from '@/src/shared/domain/Pagination';
import { ApiError } from '@/src/shared/domain/ApiError';

export class GetProductsViewModel {
  private state = {
    products: [] as Product[],
    pagination: null as Pagination | null,
    loading: false,
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

  init(): Promise<void> {
    if (this.state.products.length > 0) return Promise.resolve();
    return this.loadProducts();
  }

  loadProducts(): Promise<void> {
    this.state.loading = true;
    this.notify();

    return this.getProductsUseCase.execute(this.state.filters)
      .then((response) => {
        this.state.products = response.member;
        this.state.pagination = response.pagination;
      })
      .catch((error: ApiError) => {
        throw error;
      })
      .finally(() => {
        this.state.loading = false;
        this.notify();
      });
  }

  setFilters(filters: Partial<ProductFilters>) {
    this.state.filters = { ...this.state.filters, ...filters };
    this.loadProducts();
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

  setTypeFilter(type: ProductType[] | undefined) {
    this.setFilter('type', type);
  }


  getState() {
    return { ...this.state };
  }
}
