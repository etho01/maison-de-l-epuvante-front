import { UpdateAdministratorData } from '../../../domain/entities/Administrator';
import { UpdateAdministratorUseCase } from '../../../application/usecases/administrators';
import { ApiError } from '@/src/shared/domain/ApiError';

export class UpdateAdministratorViewModel {
  private state = {
    loading: false,
    error: null as string | null,
    success: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private updateAdministratorUseCase: UpdateAdministratorUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  updateAdministrator(id: number, data: UpdateAdministratorData): Promise<boolean> {
    this.state.loading = true;
    this.state.error = null;
    this.state.success = false;
    this.notify();

    return this.updateAdministratorUseCase.execute(id, data)
      .then(() => {
        this.state.success = true;
        return true;
      })
      .catch((err: ApiError) => {
        this.state.error = err.message || 'Erreur lors de la mise à jour de l\'administrateur';
        this.state.success = false;
        return false;
      })
      .finally(() => {
        this.state.loading = false;
        this.notify();
      });
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
