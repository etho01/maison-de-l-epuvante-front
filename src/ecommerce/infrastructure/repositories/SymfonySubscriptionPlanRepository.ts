import { serverApiClient } from '@/src/shared/infrastructure/api/ServerApiClient';
import { ISubscriptionPlanRepository } from '../../domain/repositories/ISubscriptionPlanRepository';
import { SubscriptionPlan, CreateSubscriptionPlanData, UpdateSubscriptionPlanData } from '../../domain/entities/SubscriptionPlan';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { SubscriptionPlansFilters } from '../../application/usecases/subscriptions/GetSubscriptionPlansUseCase';

export class SymfonySubscriptionPlanRepository implements ISubscriptionPlanRepository {
  async getSubscriptionPlans(filters?: SubscriptionPlansFilters): Promise<PaginatedResponse<SubscriptionPlan>> {
    const params = new URLSearchParams();
    
    if (filters?.page) {
      params.append('page', filters.page.toString());
    }
    
    const queryString = params.toString();
    const url = `/subscription_plans${queryString ? `?${queryString}` : ''}`;
    
    const response = await serverApiClient.get<PaginatedResponse<SubscriptionPlan>>(url);
    return response;
  }

  async getById(id: number): Promise<SubscriptionPlan> {
    return await serverApiClient.get<SubscriptionPlan>(`/subscription_plans/${id}`);
  }

  async create(data: CreateSubscriptionPlanData): Promise<SubscriptionPlan> {
    return await serverApiClient.post<SubscriptionPlan>('/subscription_plans', data);
  }

  async update(id: number, data: UpdateSubscriptionPlanData): Promise<SubscriptionPlan> {
    return await serverApiClient.patch<SubscriptionPlan>(`/subscription_plans/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    await serverApiClient.delete(`/subscription_plans/${id}`);
  }
}
