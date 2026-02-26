import { ISubscriptionRepository } from '../../domain/repositories/ISubscriptionRepository';
import { Subscription, SubscribeData, RenewSubscriptionData } from '../../domain/entities/Subscription';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { ClientApiClient } from '@/src/shared/infrastructure/api/ClientApiClient';

export class ClientSubscriptionRepository implements ISubscriptionRepository {
  private client: ClientApiClient;

  constructor() {
    this.client = new ClientApiClient('/api/ecommerce');
  }

  async getSubscriptions(page?: number): Promise<PaginatedResponse<Subscription>> {
    const endpoint = page ? `/subscriptions?page=${page}` : '/subscriptions';
    return await this.client.get<PaginatedResponse<Subscription>>(endpoint);
  }

  async getById(id: number): Promise<Subscription> {
    return await this.client.get<Subscription>(`/subscriptions/${id}`);
  }

  async subscribe(data: SubscribeData): Promise<Subscription> {
    return await this.client.post<Subscription>('/subscriptions/subscribe', data);
  }

  async cancel(id: number): Promise<Subscription> {
    return await this.client.patch<Subscription>(`/subscriptions/${id}/cancel`, {});
  }

  async renew(id: number, data: RenewSubscriptionData): Promise<Subscription> {
    return await this.client.patch<Subscription>(`/subscriptions/${id}/renew`, data);
  }
}
