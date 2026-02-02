import { Product, ProductFilters } from '../../domain/entities/Product';
import { Category } from '../../domain/entities/Category';
import { GetProductsUseCase } from '../../application/usecases/GetProductsUseCase';
import { GetCategoriesUseCase } from '../../application/usecases/GetCategoriesUseCase';

export class ProductCatalogViewModel {
  private state = {
    products: [] as Product[],
    categories: [] as Category[],
    loading: true,
    error: null as string | null,
    filters: {} as ProductFilters,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getProductsUseCase: GetProductsUseCase,
    private getCategoriesUseCase: GetCategoriesUseCase
  ) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async init() {
    await Promise.all([this.loadCategories(), this.loadProducts()]);
  }

  async loadCategories() {
    try {
      const categoriesData = await this.getCategoriesUseCase.execute();
      this.state.categories = categoriesData;
      this.notify();
    } catch (err: any) {
      console.error('Erreur lors du chargement des catégories:', err);
    }
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

  setCategoryFilter(categoryId: number | undefined) {
    this.state.filters = {
      ...this.state.filters,
      'category.id': categoryId,
    };
    this.loadProducts();
  }

  setTypeFilter(type: string | undefined) {
    this.state.filters = {
      ...this.state.filters,
      type: type as any,
    };
    this.loadProducts();
  }

  getState() {
    return { ...this.state };
  }
}
