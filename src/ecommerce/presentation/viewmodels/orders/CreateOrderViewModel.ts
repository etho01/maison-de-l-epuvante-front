import { CheckoutData, CheckoutResponse } from '../../../domain/entities/Order';
import { CheckoutUseCase } from '../../../application/usecases/orders';
import { ApiError } from '@/src/shared/domain/ApiError';

interface CreateOrderState {
  loading: boolean;
  success: boolean;
  sessionId: string | null;
  orderId: number | null;
  orderNumber: string | null;
}

export class CreateOrderViewModel {
  private state: CreateOrderState = {
    loading: false,
    success: false,
    sessionId: null,
    orderId: null,
    orderNumber: null,
  };

  private listeners: Set<() => void> = new Set();

  constructor(private checkoutUseCase: CheckoutUseCase) {}

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  checkout(data: CheckoutData): Promise<CheckoutResponse> {
    this.state.loading = true;
    this.state.success = false;
    this.state.sessionId = null;
    this.notify();

    return this.checkoutUseCase.execute(data)
      .then((response) => {
        this.state.sessionId = response.stripeCheckout.sessionId;
        this.state.orderId = response.order.id;
        this.state.orderNumber = response.order.orderNumber;
        this.state.success = true;
        return response;
      })
      .catch((error: ApiError) => {
        throw error;
      })
      .finally(() => {
        this.state.loading = false;
        this.notify();
      });
  }

  resetState() {
    this.state.success = false;
    this.state.sessionId = null;
    this.state.orderId = null;
    this.state.orderNumber = null;
    this.notify();
  }

  getState() {
    return { ...this.state };
  }
}
