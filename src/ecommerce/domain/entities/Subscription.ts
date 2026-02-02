import { User } from '@/src/auth/domain/entities/User';
import { SubscriptionPlan } from './SubscriptionPlan';

export type SubscriptionStatus = 'pending' | 'active' | 'cancelled' | 'expired';

export interface Subscription {
  id: number;
  user: User;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscribeData {
  plan: string; // IRI like /api/subscription-plans/2
  paymentMethod: string;
  autoRenew?: boolean;
}

export interface RenewSubscriptionData {
  autoRenew?: boolean;
}
