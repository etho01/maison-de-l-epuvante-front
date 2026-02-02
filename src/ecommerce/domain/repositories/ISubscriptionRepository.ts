import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { Subscription, SubscribeData, RenewSubscriptionData } from '../entities/Subscription';

export interface ISubscriptionRepository {
  getSubscriptions(page?: number): Promise<PaginatedResponse<Subscription>>;
  getById(id: number): Promise<Subscription>;
  subscribe(data: SubscribeData): Promise<Subscription>;
  cancel(id: number): Promise<Subscription>;
  renew(id: number, data: RenewSubscriptionData): Promise<Subscription>;
}
