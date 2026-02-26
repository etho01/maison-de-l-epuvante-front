import { serverApiClient } from '@/src/shared/infrastructure/api/ServerApiClient';
import { ISubscriptionRepository } from '../../domain/repositories/ISubscriptionRepository';
import { Subscription, SubscribeData, RenewSubscriptionData } from '../../domain/entities/Subscription';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

export class SymfonySubscriptionRepository implements ISubscriptionRepository {
  async getSubscriptions(page?: number): Promise<PaginatedResponse<Subscription>> {
    const endpoint = page ? `/subscriptions?page=${page}` : '/subscriptions';
    return await serverApiClient.get<PaginatedResponse<Subscription>>(endpoint);
  }

  async getById(id: number): Promise<Subscription> {
    return await serverApiClient.get<Subscription>(`/subscriptions/${id}`);
  }

  async subscribe(data: SubscribeData): Promise<Subscription> {
    return await serverApiClient.post<Subscription>('/subscriptions/subscribe', data);
  }

  async cancel(id: number): Promise<Subscription> {
    return await serverApiClient.patch<Subscription>(`/subscriptions/${id}/cancel`, {});
  }

  async renew(id: number, data: RenewSubscriptionData): Promise<Subscription> {
    return await serverApiClient.patch<Subscription>(`/subscriptions/${id}/renew`, data);
  }
}
