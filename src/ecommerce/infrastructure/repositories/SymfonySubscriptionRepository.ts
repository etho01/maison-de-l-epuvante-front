import { apiClient } from '@/src/auth/infrastructure/api/apiClient';
import { ISubscriptionRepository } from '../../domain/repositories/ISubscriptionRepository';
import { PaginatedResponse } from '../../domain/repositories/IProductRepository';
import { Subscription, SubscribeData, RenewSubscriptionData } from '../../domain/entities/Subscription';

export class SymfonySubscriptionRepository implements ISubscriptionRepository {
  async getAll(page?: number): Promise<PaginatedResponse<Subscription>> {
    const endpoint = page ? `/subscriptions?page=${page}` : '/subscriptions';
    return await apiClient.get<PaginatedResponse<Subscription>>(endpoint);
  }

  async getById(id: number): Promise<Subscription> {
    return await apiClient.get<Subscription>(`/subscriptions/${id}`);
  }

  async subscribe(data: SubscribeData): Promise<Subscription> {
    return await apiClient.post<Subscription>('/subscriptions/subscribe', data);
  }

  async cancel(id: number): Promise<Subscription> {
    return await apiClient.patch<Subscription>(`/subscriptions/${id}/cancel`, {});
  }

  async renew(id: number, data: RenewSubscriptionData): Promise<Subscription> {
    return await apiClient.patch<Subscription>(`/subscriptions/${id}/renew`, data);
  }
}
