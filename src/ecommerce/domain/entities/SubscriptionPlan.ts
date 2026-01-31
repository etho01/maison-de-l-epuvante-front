export type BillingInterval = 'monthly' | 'quarterly' | 'yearly';
export type SubscriptionFormat = 'paper' | 'digital' | 'both';

export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: string;
  billingInterval: BillingInterval;
  durationInMonths: number;
  format: SubscriptionFormat;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionPlanData {
  name: string;
  description: string;
  price: string;
  billingInterval: BillingInterval;
  durationInMonths: number;
  format: SubscriptionFormat;
  active?: boolean;
}

export interface UpdateSubscriptionPlanData {
  name?: string;
  description?: string;
  price?: string;
  billingInterval?: BillingInterval;
  durationInMonths?: number;
  format?: SubscriptionFormat;
  active?: boolean;
}
