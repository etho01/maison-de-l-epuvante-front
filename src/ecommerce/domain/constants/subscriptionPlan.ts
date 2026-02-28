import { BillingInterval, SubscriptionFormat } from '@/src/ecommerce/domain/entities/SubscriptionPlan';

/**
 * Labels métier des plans d'abonnement.
 * Les variants/couleurs (présentation) restent dans la couche présentation.
 */
export const BILLING_INTERVAL_LABELS: Record<BillingInterval, string> = {
  monthly:   'Mensuel',
  quarterly: 'Trimestriel',
  yearly:    'Annuel',
};

export const SUBSCRIPTION_FORMAT_LABELS: Record<SubscriptionFormat, string> = {
  paper:   'Papier',
  digital: 'Numérique',
  both:    'Papier + Numérique',
};
