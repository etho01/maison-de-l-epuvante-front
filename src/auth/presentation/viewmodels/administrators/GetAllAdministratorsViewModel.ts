import { Administrator } from '../../../domain/entities/Administrator';
import { GetAllAdministratorsUseCase } from '../../../application/usecases/administrators';

export class GetAllAdministratorsViewModel {
  private state = {
    administrators: [] as Administrator[],
    loading: false,
    error: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(
    private getAllAdministratorsUseCase: GetAllAdministratorsUseCase,
    initialAdministrators?: Administrator[]
  ) {
    if (initialAdministrators) {
      this.state.administrators = initialAdministrators;
    }
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  async loadAdministrators(): Promise<void> {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.notify();

      const administrators = await this.getAllAdministratorsUseCase.execute();
      this.state.administrators = administrators;
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors du chargement des administrateurs';
      this.state.administrators = [];
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  getState() {
    return { ...this.state };
  }
}
