import { SubscriptionPlan, CreateSubscriptionPlanData, UpdateSubscriptionPlanData } from '../entities/SubscriptionPlan';
import { PaginatedResponse } from './IProductRepository';

export interface ISubscriptionPlanRepository {
  getSubscriptionPlans(): Promise<PaginatedResponse<SubscriptionPlan>>;
  getById(id: number): Promise<SubscriptionPlan>;
  create(data: CreateSubscriptionPlanData): Promise<SubscriptionPlan>;
  update(id: number, data: UpdateSubscriptionPlanData): Promise<SubscriptionPlan>;
  delete(id: number): Promise<void>;
}
