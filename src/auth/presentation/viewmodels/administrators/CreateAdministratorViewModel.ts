import { CreateAdministratorData } from '../../../domain/entities/Administrator';
import { CreateAdministratorUseCase } from '../../../application/usecases/administrators';
import { ApiError } from '@/src/shared/domain/ApiError';

export class CreateAdministratorViewModel {
  private state = {
    loading: false,
    error: null as string | null,
    success: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private createAdministratorUseCase: CreateAdministratorUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  createAdministrator(data: CreateAdministratorData): Promise<boolean> {
    this.state.loading = true;
    this.state.error = null;
    this.state.success = false;
    this.notify();

    return this.createAdministratorUseCase.execute(data)
      .then(() => {
        this.state.success = true;
        return true;
      })
      .catch((err: ApiError) => {
        this.state.error = err.message || 'Erreur lors de la création de l\'administrateur';
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
