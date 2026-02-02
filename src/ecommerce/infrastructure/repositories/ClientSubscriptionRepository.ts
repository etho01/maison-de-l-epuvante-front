import { ISubscriptionRepository } from '../../domain/repositories/ISubscriptionRepository';
import { Subscription, SubscribeData, RenewSubscriptionData } from '../../domain/entities/Subscription';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

export class ClientSubscriptionRepository implements ISubscriptionRepository {
  private baseURL: string;

  constructor() {
    this.baseURL = '/api/ecommerce';
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Une erreur est survenue');
    }

    if (response.status === 204) {
      return null as T;
    }

    return await response.json();
  }

  async getSubscriptions(page?: number): Promise<PaginatedResponse<Subscription>> {
    const endpoint = page ? `/subscriptions?page=${page}` : '/subscriptions';
    return await this.request<PaginatedResponse<Subscription>>(endpoint);
  }

  async getById(id: number): Promise<Subscription> {
    return await this.request<Subscription>(`/subscriptions/${id}`);
  }

  async subscribe(data: SubscribeData): Promise<Subscription> {
    return await this.request<Subscription>('/subscriptions/subscribe', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async cancel(id: number): Promise<Subscription> {
    return await this.request<Subscription>(`/subscriptions/${id}/cancel`, {
      method: 'PATCH',
      body: JSON.stringify({}),
    });
  }

  async renew(id: number, data: RenewSubscriptionData): Promise<Subscription> {
    return await this.request<Subscription>(`/subscriptions/${id}/renew`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}
