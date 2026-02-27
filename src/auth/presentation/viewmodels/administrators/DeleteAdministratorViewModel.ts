import { DeleteAdministratorUseCase } from '../../../application/usecases/administrators';
import { ApiError } from '@/src/shared/domain/ApiError';

export class DeleteAdministratorViewModel {
  private state = {
    loading: false,
    error: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private deleteAdministratorUseCase: DeleteAdministratorUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  deleteAdministrator(id: number): Promise<boolean> {
    this.state.loading = true;
    this.state.error = null;
    this.notify();

    return this.deleteAdministratorUseCase.execute(id)
      .then(() => {
        return true;
      })
      .catch((err: ApiError) => {
        this.state.error = err.message || 'Erreur lors de la suppression de l\'administrateur';
        return false;
      })
      .finally(() => {
        this.state.loading = false;
        this.notify();
      });
  }

  resetState() {
    this.state.error = null;
    this.notify();
  }

  getState() {
    return { ...this.state };
  }
}
