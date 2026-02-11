import { Category } from '../../domain/entities/Category';
import { GetCategoriesUseCase, GetAllCategoriesUseCase, GetCategoryByIdUseCase } from '../../application/usecases/categories';
import { Pagination } from '@/src/shared/domain/Pagination';

export class CategoryListViewModel {
  private state = {
    categories: [] as Category[],
    allCategories: [] as Category[],
    currentCategory: null as Category | null,
    pagination: null as Pagination | null,
    loading: false,
    error: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getCategoriesUseCase: GetCategoriesUseCase,
    private getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private getCategoryByIdUseCase: GetCategoryByIdUseCase,
    initialCategories?: Category[]
  ) {
    if (initialCategories) {
      this.state.categories = initialCategories;
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
    if (this.state.categories.length > 0) return;
    await this.loadCategories();
  }

  async loadCategories() {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      const response = await this.getCategoriesUseCase.execute();
      this.state.categories = response.member;
      this.state.pagination = response.pagination;
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors du chargement des catégories';
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  async loadAllCategories() {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      this.state.allCategories = await this.getAllCategoriesUseCase.execute();
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors du chargement des catégories';
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  async loadCategoryById(id: number) {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      this.state.currentCategory = await this.getCategoryByIdUseCase.execute(id);
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors du chargement de la catégorie';
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  getState() {
    return { ...this.state };
  }
}
