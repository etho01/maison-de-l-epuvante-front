import { CheckoutData, CheckoutResponse } from '../../../domain/entities/Order';
import { CheckoutUseCase } from '../../../application/usecases/orders';

interface CreateOrderState {
  loading: boolean;
  success: boolean;
  clientSecret: string | null;
  orderId: number | null;
  orderNumber: string | null;
}

export class CreateOrderViewModel {
  private state: CreateOrderState = {
    loading: false,
    success: false,
    clientSecret: null,
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

  async checkout(data: CheckoutData): Promise<CheckoutResponse> {
    this.state.loading = true;
    this.state.success = false;
    this.state.clientSecret = null;
    this.notify();

    try {
      const response = await this.checkoutUseCase.execute(data);
      
      this.state.clientSecret = response.stripePayment.clientSecret;
      this.state.orderId = response.order.id;
      this.state.orderNumber = response.order.orderNumber;
      this.state.success = true;
      
      return response;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  resetState() {
    this.state.success = false;
    this.state.clientSecret = null;
    this.state.orderId = null;
    this.state.orderNumber = null;
    this.notify();
  }

  getState() {
    return { ...this.state };
  }
}
