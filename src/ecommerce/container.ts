/**
 * Ecommerce Container — Injection de dépendances (CLIENT-SIDE)
 *
 * Lazy singletons : repositories et use cases sont instanciés uniquement
 * au premier accès, puis mis en cache. Rien n'est créé au chargement du module.
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

class EcommerceContainer {
  // ─── Repositories (lazy) ──────────────────────────────────────────────────
  private _categoryRepository?: ClientCategoryRepository;
  private get categoryRepository() {
    return (this._categoryRepository ??= new ClientCategoryRepository());
  }

  private _productRepository?: ClientProductRepository;
  private get productRepository() {
    return (this._productRepository ??= new ClientProductRepository());
  }

  private _orderRepository?: ClientOrderRepository;
  private get orderRepository() {
    return (this._orderRepository ??= new ClientOrderRepository());
  }

  private _subscriptionRepository?: ClientSubscriptionRepository;
  private get subscriptionRepository() {
    return (this._subscriptionRepository ??= new ClientSubscriptionRepository());
  }

  private _subscriptionPlanRepository?: ClientSubscriptionPlanRepository;
  private get subscriptionPlanRepository() {
    return (this._subscriptionPlanRepository ??= new ClientSubscriptionPlanRepository());
  }

  private _digitalContentRepository?: ClientDigitalContentRepository;
  private get digitalContentRepository() {
    return (this._digitalContentRepository ??= new ClientDigitalContentRepository());
  }

  // ─── Categories ───────────────────────────────────────────────────────────
  private _getCategoriesUseCase?: GetCategoriesUseCase;
  get getCategoriesUseCase() {
    return (this._getCategoriesUseCase ??= new GetCategoriesUseCase(this.categoryRepository));
  }

  private _getAllCategoriesUseCase?: GetAllCategoriesUseCase;
  get getAllCategoriesUseCase() {
    return (this._getAllCategoriesUseCase ??= new GetAllCategoriesUseCase(this.categoryRepository));
  }

  private _getCategoryByIdUseCase?: GetCategoryByIdUseCase;
  get getCategoryByIdUseCase() {
    return (this._getCategoryByIdUseCase ??= new GetCategoryByIdUseCase(this.categoryRepository));
  }

  private _createCategoryUseCase?: CreateCategoryUseCase;
  get createCategoryUseCase() {
    return (this._createCategoryUseCase ??= new CreateCategoryUseCase(this.categoryRepository));
  }

  private _updateCategoryUseCase?: UpdateCategoryUseCase;
  get updateCategoryUseCase() {
    return (this._updateCategoryUseCase ??= new UpdateCategoryUseCase(this.categoryRepository));
  }

  private _deleteCategoryUseCase?: DeleteCategoryUseCase;
  get deleteCategoryUseCase() {
    return (this._deleteCategoryUseCase ??= new DeleteCategoryUseCase(this.categoryRepository));
  }

  // ─── Products ─────────────────────────────────────────────────────────────
  private _getProductsUseCase?: GetProductsUseCase;
  get getProductsUseCase() {
    return (this._getProductsUseCase ??= new GetProductsUseCase(this.productRepository));
  }

  private _getProductByIdUseCase?: GetProductByIdUseCase;
  get getProductByIdUseCase() {
    return (this._getProductByIdUseCase ??= new GetProductByIdUseCase(this.productRepository));
  }

  private _getProductBySlugUseCase?: GetProductBySlugUseCase;
  get getProductBySlugUseCase() {
    return (this._getProductBySlugUseCase ??= new GetProductBySlugUseCase(this.productRepository));
  }

  private _createProductUseCase?: CreateProductUseCase;
  get createProductUseCase() {
    return (this._createProductUseCase ??= new CreateProductUseCase(this.productRepository));
  }

  private _updateProductUseCase?: UpdateProductUseCase;
  get updateProductUseCase() {
    return (this._updateProductUseCase ??= new UpdateProductUseCase(this.productRepository));
  }

  private _deleteProductUseCase?: DeleteProductUseCase;
  get deleteProductUseCase() {
    return (this._deleteProductUseCase ??= new DeleteProductUseCase(this.productRepository));
  }

  // ─── Orders ───────────────────────────────────────────────────────────────
  private _getOrdersUseCase?: GetOrdersUseCase;
  get getOrdersUseCase() {
    return (this._getOrdersUseCase ??= new GetOrdersUseCase(this.orderRepository));
  }

  private _getOrderByIdUseCase?: GetOrderByIdUseCase;
  get getOrderByIdUseCase() {
    return (this._getOrderByIdUseCase ??= new GetOrderByIdUseCase(this.orderRepository));
  }

  private _checkoutUseCase?: CheckoutUseCase;
  get checkoutUseCase() {
    return (this._checkoutUseCase ??= new CheckoutUseCase(this.orderRepository));
  }

  private _updateOrderUseCase?: UpdateOrderUseCase;
  get updateOrderUseCase() {
    return (this._updateOrderUseCase ??= new UpdateOrderUseCase(this.orderRepository));
  }

  // ─── Subscriptions ────────────────────────────────────────────────────────
  private _getSubscriptionsUseCase?: GetSubscriptionsUseCase;
  get getSubscriptionsUseCase() {
    return (this._getSubscriptionsUseCase ??= new GetSubscriptionsUseCase(this.subscriptionRepository));
  }

  private _getSubscriptionByIdUseCase?: GetSubscriptionByIdUseCase;
  get getSubscriptionByIdUseCase() {
    return (this._getSubscriptionByIdUseCase ??= new GetSubscriptionByIdUseCase(this.subscriptionRepository));
  }

  private _subscribeUseCase?: SubscribeUseCase;
  get subscribeUseCase() {
    return (this._subscribeUseCase ??= new SubscribeUseCase(this.subscriptionRepository));
  }

  private _cancelSubscriptionUseCase?: CancelSubscriptionUseCase;
  get cancelSubscriptionUseCase() {
    return (this._cancelSubscriptionUseCase ??= new CancelSubscriptionUseCase(this.subscriptionRepository));
  }

  private _renewSubscriptionUseCase?: RenewSubscriptionUseCase;
  get renewSubscriptionUseCase() {
    return (this._renewSubscriptionUseCase ??= new RenewSubscriptionUseCase(this.subscriptionRepository));
  }

  private _getSubscriptionPlansUseCase?: GetSubscriptionPlansUseCase;
  get getSubscriptionPlansUseCase() {
    return (this._getSubscriptionPlansUseCase ??= new GetSubscriptionPlansUseCase(this.subscriptionPlanRepository));
  }

  private _getSubscriptionPlanByIdUseCase?: GetSubscriptionPlanByIdUseCase;
  get getSubscriptionPlanByIdUseCase() {
    return (this._getSubscriptionPlanByIdUseCase ??= new GetSubscriptionPlanByIdUseCase(this.subscriptionPlanRepository));
  }

  private _createSubscriptionPlanUseCase?: CreateSubscriptionPlanUseCase;
  get createSubscriptionPlanUseCase() {
    return (this._createSubscriptionPlanUseCase ??= new CreateSubscriptionPlanUseCase(this.subscriptionPlanRepository));
  }

  private _updateSubscriptionPlanUseCase?: UpdateSubscriptionPlanUseCase;
  get updateSubscriptionPlanUseCase() {
    return (this._updateSubscriptionPlanUseCase ??= new UpdateSubscriptionPlanUseCase(this.subscriptionPlanRepository));
  }

  private _deleteSubscriptionPlanUseCase?: DeleteSubscriptionPlanUseCase;
  get deleteSubscriptionPlanUseCase() {
    return (this._deleteSubscriptionPlanUseCase ??= new DeleteSubscriptionPlanUseCase(this.subscriptionPlanRepository));
  }

  // ─── Digital Content ──────────────────────────────────────────────────────
  private _getDigitalContentsUseCase?: GetDigitalContentsUseCase;
  get getDigitalContentsUseCase() {
    return (this._getDigitalContentsUseCase ??= new GetDigitalContentsUseCase(this.digitalContentRepository));
  }

  private _getDigitalContentByIdUseCase?: GetDigitalContentByIdUseCase;
  get getDigitalContentByIdUseCase() {
    return (this._getDigitalContentByIdUseCase ??= new GetDigitalContentByIdUseCase(this.digitalContentRepository));
  }

  private _downloadDigitalContentUseCase?: DownloadDigitalContentUseCase;
  get downloadDigitalContentUseCase() {
    return (this._downloadDigitalContentUseCase ??= new DownloadDigitalContentUseCase(this.digitalContentRepository));
  }
}

export const ecommerceContainer = new EcommerceContainer();
