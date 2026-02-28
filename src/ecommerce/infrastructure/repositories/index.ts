/**
 * Ecommerce Repository Factory
 *
 * Point d'entrée unique pour obtenir les repositories ecommerce.
 *
 * Règle :
 *   - Contexte CLIENT (composants React, hooks) → getClient*Repository()
 *   - Contexte SERVEUR (API Routes, Server Components) → getServer*Repository()
 */

import { ClientCategoryRepository } from './ClientCategoryRepository';
import { SymfonyCategoryRepository } from './SymfonyCategoryRepository';
import { ClientProductRepository } from './ClientProductRepository';
import { SymfonyProductRepository } from './SymfonyProductRepository';
import { ClientOrderRepository } from './ClientOrderRepository';
import { SymfonyOrderRepository } from './SymfonyOrderRepository';
import { ClientSubscriptionRepository } from './ClientSubscriptionRepository';
import { SymfonySubscriptionRepository } from './SymfonySubscriptionRepository';
import { ClientSubscriptionPlanRepository } from './ClientSubscriptionPlanRepository';
import { SymfonySubscriptionPlanRepository } from './SymfonySubscriptionPlanRepository';
import { ClientDigitalContentRepository } from './ClientDigitalContentRepository';
import { SymfonyDigitalContentRepository } from './SymfonyDigitalContentRepository';

// ─── Categories ──────────────────────────────────────────────────────────────
export const getClientCategoryRepository = () => new ClientCategoryRepository();
export const getServerCategoryRepository = () => new SymfonyCategoryRepository();

// ─── Products ─────────────────────────────────────────────────────────────────
export const getClientProductRepository = () => new ClientProductRepository();
export const getServerProductRepository = () => new SymfonyProductRepository();

// ─── Orders ───────────────────────────────────────────────────────────────────
export const getClientOrderRepository = () => new ClientOrderRepository();
export const getServerOrderRepository = () => new SymfonyOrderRepository();

// ─── Subscriptions ────────────────────────────────────────────────────────────
export const getClientSubscriptionRepository = () => new ClientSubscriptionRepository();
export const getServerSubscriptionRepository = () => new SymfonySubscriptionRepository();

// ─── Subscription Plans ───────────────────────────────────────────────────────
export const getClientSubscriptionPlanRepository = () => new ClientSubscriptionPlanRepository();
export const getServerSubscriptionPlanRepository = () => new SymfonySubscriptionPlanRepository();

// ─── Digital Content ──────────────────────────────────────────────────────────
export const getClientDigitalContentRepository = () => new ClientDigitalContentRepository();
export const getServerDigitalContentRepository = () => new SymfonyDigitalContentRepository();

// ─── Re-exports directs (pour les cas qui ont besoin du type concret) ─────────
export {
  ClientCategoryRepository, SymfonyCategoryRepository,
  ClientProductRepository, SymfonyProductRepository,
  ClientOrderRepository, SymfonyOrderRepository,
  ClientSubscriptionRepository, SymfonySubscriptionRepository,
  ClientSubscriptionPlanRepository, SymfonySubscriptionPlanRepository,
  ClientDigitalContentRepository, SymfonyDigitalContentRepository,
};
