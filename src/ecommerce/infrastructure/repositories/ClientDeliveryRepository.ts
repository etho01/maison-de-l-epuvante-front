import { IDeliveryRepository } from '../../domain/repositories/IDeliveryRepository';
import { Delivery, DeliveryStatus } from '../../domain/entities/Devivery';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { ClientApiClient } from '@/src/shared/infrastructure/api/ClientApiClient';

export class ClientDeliveryRepository implements IDeliveryRepository {
  private client: ClientApiClient;

  constructor() {
    this.client = new ClientApiClient('/api');
  }

  async getDeliveries(page?: number): Promise<PaginatedResponse<Delivery>> {
    const endpoint = page ? `/deliveries?page=${page}` : '/deliveries';
    return await this.client.get<PaginatedResponse<Delivery>>(endpoint);
  }

  async getById(id: number): Promise<Delivery> {
    return await this.client.get<Delivery>(`/deliveries/${id}`);
  }

  async updateStatus(id: number, status: DeliveryStatus): Promise<Delivery> {
    return await this.client.post<Delivery>(`/deliveries/${id}/status`, { status });
  }

  async getByPaymentIntentId(paymentIntentId: string): Promise<Delivery> {
    return await this.client.get<Delivery>(`/deliveries/payment-intent/${paymentIntentId}`);
  }
}
