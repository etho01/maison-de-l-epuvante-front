import { SubscriptionPlan, CreateSubscriptionPlanData, UpdateSubscriptionPlanData } from '../entities/SubscriptionPlan';

export interface ISubscriptionPlanRepository {
  getAll(): Promise<SubscriptionPlan[]>;
  getById(id: number): Promise<SubscriptionPlan>;
  create(data: CreateSubscriptionPlanData): Promise<SubscriptionPlan>;
  update(id: number, data: UpdateSubscriptionPlanData): Promise<SubscriptionPlan>;
  delete(id: number): Promise<void>;
}
