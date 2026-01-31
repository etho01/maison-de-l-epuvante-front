import { Subscription, SubscribeData, RenewSubscriptionData } from '../entities/Subscription';
import { PaginatedResponse } from './IProductRepository';

export interface ISubscriptionRepository {
  getAll(page?: number): Promise<PaginatedResponse<Subscription>>;
  getById(id: number): Promise<Subscription>;
  subscribe(data: SubscribeData): Promise<Subscription>;
  cancel(id: number): Promise<Subscription>;
  renew(id: number, data: RenewSubscriptionData): Promise<Subscription>;
}
