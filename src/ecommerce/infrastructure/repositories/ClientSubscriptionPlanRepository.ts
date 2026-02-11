import { ISubscriptionPlanRepository } from '../../domain/repositories/ISubscriptionPlanRepository';
import { SubscriptionPlan, CreateSubscriptionPlanData, UpdateSubscriptionPlanData } from '../../domain/entities/SubscriptionPlan';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

export class ClientSubscriptionPlanRepository implements ISubscriptionPlanRepository {
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

  async getSubscriptionPlans(filters?: { page?: number }): Promise<PaginatedResponse<SubscriptionPlan>> {
    const params = new URLSearchParams();
    
    if (filters?.page) {
      params.append('page', filters.page.toString());
    }
    
    const queryString = params.toString();
    const endpoint = `/subscription-plans${queryString ? `?${queryString}` : ''}`;
    
    return await this.request<PaginatedResponse<SubscriptionPlan>>(endpoint);
  }

  async getById(id: number): Promise<SubscriptionPlan> {
    return await this.request<SubscriptionPlan>(`/subscription-plans/${id}`);
  }

  async create(data: CreateSubscriptionPlanData): Promise<SubscriptionPlan> {
    return await this.request<SubscriptionPlan>('/subscription-plans', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async update(id: number, data: UpdateSubscriptionPlanData): Promise<SubscriptionPlan> {
    return await this.request<SubscriptionPlan>(`/subscription-plans/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(id: number): Promise<void> {
    await this.request(`/subscription-plans/${id}`, {
      method: 'DELETE',
    });
  }
}
