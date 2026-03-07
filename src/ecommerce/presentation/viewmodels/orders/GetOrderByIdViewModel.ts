
import { GetOrderByIdUseCase } from '@/src/ecommerce/application/usecases';
import { Order } from '@/src/ecommerce/domain/entities/Order';
import { ApiError } from '@/src/shared/domain/ApiError';

export class GetOrderByIdViewModel {
  private state = {
    order: null as Order | null,
    loading: false,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private getOrderByIdUseCase: GetOrderByIdUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  loadOrder(id: number): Promise<void> {
    this.state.loading = true;
    this.notify();

    return this.getOrderByIdUseCase.execute(id)
      .then((order : Order) => {
        this.state.order = order;
      })
      .catch((error: ApiError) => {
        throw error;
      })
      .finally(() => {
        this.state.loading = false;
        this.notify();
      });
  }

  getState() {
    return { ...this.state };
  }
}
