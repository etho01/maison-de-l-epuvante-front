import { ISubscriptionPlanRepository } from '../../domain/repositories/ISubscriptionPlanRepository';
import { SubscriptionPlan, CreateSubscriptionPlanData, UpdateSubscriptionPlanData } from '../../domain/entities/SubscriptionPlan';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { ClientApiClient } from '@/src/shared/infrastructure/api/ClientApiClient';

export class ClientSubscriptionPlanRepository implements ISubscriptionPlanRepository {
  private client: ClientApiClient;

  constructor() {
    this.client = new ClientApiClient('/api/ecommerce');
  }

  async getSubscriptionPlans(filters?: { page?: number }): Promise<PaginatedResponse<SubscriptionPlan>> {
    const params = new URLSearchParams();
    
    if (filters?.page) {
      params.append('page', filters.page.toString());
    }
    
    const queryString = params.toString();
    const endpoint = `/subscription-plans${queryString ? `?${queryString}` : ''}`;
    
    return await this.client.get<PaginatedResponse<SubscriptionPlan>>(endpoint);
  }

  async getById(id: number): Promise<SubscriptionPlan> {
    return await this.client.get<SubscriptionPlan>(`/subscription-plans/${id}`);
  }

  async create(data: CreateSubscriptionPlanData): Promise<SubscriptionPlan> {
    return await this.client.post<SubscriptionPlan>('/subscription-plans', data);
  }

  async update(id: number, data: UpdateSubscriptionPlanData): Promise<SubscriptionPlan> {
    return await this.client.patch<SubscriptionPlan>(`/subscription-plans/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/subscription-plans/${id}`);
  }
}
