import { apiClient } from '@/src/auth/infrastructure/api/apiClient';
import { ISubscriptionPlanRepository } from '../../domain/repositories/ISubscriptionPlanRepository';
import { SubscriptionPlan, CreateSubscriptionPlanData, UpdateSubscriptionPlanData } from '../../domain/entities/SubscriptionPlan';

export class SymfonySubscriptionPlanRepository implements ISubscriptionPlanRepository {
  async getAll(): Promise<SubscriptionPlan[]> {
    const response = await apiClient.get<{ 'hydra:member': SubscriptionPlan[] }>('/subscription-plans');
    return response['hydra:member'];
  }

  async getById(id: number): Promise<SubscriptionPlan> {
    return await apiClient.get<SubscriptionPlan>(`/subscription-plans/${id}`);
  }

  async create(data: CreateSubscriptionPlanData): Promise<SubscriptionPlan> {
    return await apiClient.post<SubscriptionPlan>('/subscription-plans', data);
  }

  async update(id: number, data: UpdateSubscriptionPlanData): Promise<SubscriptionPlan> {
    return await apiClient.patch<SubscriptionPlan>(`/subscription-plans/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/subscription-plans/${id}`);
  }
}
