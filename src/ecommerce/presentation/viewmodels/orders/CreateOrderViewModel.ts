import { CheckoutData, CheckoutResponse } from '../../../domain/entities/Order';
import { CheckoutUseCase } from '../../../application/usecases/orders';

interface CreateOrderState {
  loading: boolean;
  error: string | null;
  success: boolean;
  clientSecret: string | null;
  orderId: number | null;
  orderNumber: string | null;
}

export class CreateOrderViewModel {
  private state: CreateOrderState = {
    loading: false,
    error: null,
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

  async checkout(data: CheckoutData): Promise<CheckoutResponse | null> {
    try {
      this.state.loading = true;
      this.state.error = null;
      this.state.success = false;
      this.state.clientSecret = null;
      this.notify();

      const response = await this.checkoutUseCase.execute(data);
      
      this.state.clientSecret = response.stripePayment.clientSecret;
      this.state.orderId = response.order.id;
      this.state.orderNumber = response.order.orderNumber;
      this.state.success = true;
      
      return response;
    } catch (err: any) {
      this.state.error = err.message || 'Erreur lors de la création de la commande';
      this.state.success = false;
      return null;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  resetState() {
    this.state.error = null;
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
