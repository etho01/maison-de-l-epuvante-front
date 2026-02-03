import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { SubscriptionPlan, CreateSubscriptionPlanData, UpdateSubscriptionPlanData } from '../entities/SubscriptionPlan';
import { SubscriptionPlansFilters } from '../../application/usecases/subscriptions/GetSubscriptionPlansUseCase';

export interface ISubscriptionPlanRepository {
  getSubscriptionPlans(filters?: SubscriptionPlansFilters): Promise<PaginatedResponse<SubscriptionPlan>>;
  getById(id: number): Promise<SubscriptionPlan>;
  create(data: CreateSubscriptionPlanData): Promise<SubscriptionPlan>;
  update(id: number, data: UpdateSubscriptionPlanData): Promise<SubscriptionPlan>;
  delete(id: number): Promise<void>;
}
