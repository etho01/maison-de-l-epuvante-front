/**
 * Ecommerce Container — Injection de dépendances (CLIENT-SIDE)
 *
 * Singletons côté client : un repository partagé par famille d'entité,
 * utilisé par tous les use cases correspondants.
 *
 * Usage :
 *   import { ecommerceContainer } from '@/src/ecommerce/container';
 *   const products = await ecommerceContainer.getProductsUseCase.execute();
 */

import {
  ClientCategoryRepository,
  ClientProductRepository,
  ClientOrderRepository,
  ClientSubscriptionRepository,
  ClientSubscriptionPlanRepository,
  ClientDigitalContentRepository,
} from './infrastructure/repositories';

// ─── Repositories (singletons) ───────────────────────────────────────────────
const categoryRepository = new ClientCategoryRepository();
const productRepository = new ClientProductRepository();
const orderRepository = new ClientOrderRepository();
const subscriptionRepository = new ClientSubscriptionRepository();
const subscriptionPlanRepository = new ClientSubscriptionPlanRepository();
const digitalContentRepository = new ClientDigitalContentRepository();

// ─── Use Cases ────────────────────────────────────────────────────────────────
import {
  GetCategoriesUseCase,
  GetAllCategoriesUseCase,
  GetCategoryByIdUseCase,
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
  DeleteCategoryUseCase,
} from './application/usecases/categories';

import {
  GetProductsUseCase,
  GetProductByIdUseCase,
  GetProductBySlugUseCase,
  CreateProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from './application/usecases/products';

import {
  GetOrdersUseCase,
  GetOrderByIdUseCase,
  CheckoutUseCase,
  UpdateOrderUseCase,
} from './application/usecases/orders';

import {
  GetSubscriptionsUseCase,
  GetSubscriptionByIdUseCase,
  SubscribeUseCase,
  CancelSubscriptionUseCase,
  RenewSubscriptionUseCase,
  GetSubscriptionPlansUseCase,
  GetSubscriptionPlanByIdUseCase,
  CreateSubscriptionPlanUseCase,
  UpdateSubscriptionPlanUseCase,
  DeleteSubscriptionPlanUseCase,
} from './application/usecases/subscriptions';

import {
  GetDigitalContentsUseCase,
  GetDigitalContentByIdUseCase,
  DownloadDigitalContentUseCase,
} from './application/usecases/digital-content';

export const ecommerceContainer = {
  // Categories
  getCategoriesUseCase: new GetCategoriesUseCase(categoryRepository),
  getAllCategoriesUseCase: new GetAllCategoriesUseCase(categoryRepository),
  getCategoryByIdUseCase: new GetCategoryByIdUseCase(categoryRepository),
  createCategoryUseCase: new CreateCategoryUseCase(categoryRepository),
  updateCategoryUseCase: new UpdateCategoryUseCase(categoryRepository),
  deleteCategoryUseCase: new DeleteCategoryUseCase(categoryRepository),

  // Products
  getProductsUseCase: new GetProductsUseCase(productRepository),
  getProductByIdUseCase: new GetProductByIdUseCase(productRepository),
  getProductBySlugUseCase: new GetProductBySlugUseCase(productRepository),
  createProductUseCase: new CreateProductUseCase(productRepository),
  updateProductUseCase: new UpdateProductUseCase(productRepository),
  deleteProductUseCase: new DeleteProductUseCase(productRepository),

  // Orders
  getOrdersUseCase: new GetOrdersUseCase(orderRepository),
  getOrderByIdUseCase: new GetOrderByIdUseCase(orderRepository),
  checkoutUseCase: new CheckoutUseCase(orderRepository),
  updateOrderUseCase: new UpdateOrderUseCase(orderRepository),

  // Subscriptions
  getSubscriptionsUseCase: new GetSubscriptionsUseCase(subscriptionRepository),
  getSubscriptionByIdUseCase: new GetSubscriptionByIdUseCase(subscriptionRepository),
  subscribeUseCase: new SubscribeUseCase(subscriptionRepository),
  cancelSubscriptionUseCase: new CancelSubscriptionUseCase(subscriptionRepository),
  renewSubscriptionUseCase: new RenewSubscriptionUseCase(subscriptionRepository),
  getSubscriptionPlansUseCase: new GetSubscriptionPlansUseCase(subscriptionPlanRepository),
  getSubscriptionPlanByIdUseCase: new GetSubscriptionPlanByIdUseCase(subscriptionPlanRepository),
  createSubscriptionPlanUseCase: new CreateSubscriptionPlanUseCase(subscriptionPlanRepository),
  updateSubscriptionPlanUseCase: new UpdateSubscriptionPlanUseCase(subscriptionPlanRepository),
  deleteSubscriptionPlanUseCase: new DeleteSubscriptionPlanUseCase(subscriptionPlanRepository),

  // Digital Content
  getDigitalContentsUseCase: new GetDigitalContentsUseCase(digitalContentRepository),
  getDigitalContentByIdUseCase: new GetDigitalContentByIdUseCase(digitalContentRepository),
  downloadDigitalContentUseCase: new DownloadDigitalContentUseCase(digitalContentRepository),
};
