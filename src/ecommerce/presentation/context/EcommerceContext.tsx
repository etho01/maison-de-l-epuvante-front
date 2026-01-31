'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// Client Repositories (pour les Client Components)
import { ClientProductRepository } from '../../infrastructure/repositories/ClientProductRepository';
import { ClientCategoryRepository } from '../../infrastructure/repositories/ClientCategoryRepository';
import { ClientOrderRepository } from '../../infrastructure/repositories/ClientOrderRepository';
import { ClientSubscriptionRepository } from '../../infrastructure/repositories/ClientSubscriptionRepository';
import { ClientSubscriptionPlanRepository } from '../../infrastructure/repositories/ClientSubscriptionPlanRepository';
import { ClientDigitalContentRepository } from '../../infrastructure/repositories/ClientDigitalContentRepository';

// Use Cases
import { GetProductsUseCase } from '../../application/usecases/GetProductsUseCase';
import { GetProductByIdUseCase } from '../../application/usecases/GetProductByIdUseCase';
import { GetCategoriesUseCase } from '../../application/usecases/GetCategoriesUseCase';
import { GetOrdersUseCase } from '../../application/usecases/GetOrdersUseCase';
import { GetOrderByIdUseCase } from '../../application/usecases/GetOrderByIdUseCase';
import { CheckoutUseCase } from '../../application/usecases/CheckoutUseCase';
import { GetSubscriptionsUseCase } from '../../application/usecases/GetSubscriptionsUseCase';
import { GetSubscriptionPlansUseCase } from '../../application/usecases/GetSubscriptionPlansUseCase';
import { SubscribeUseCase } from '../../application/usecases/SubscribeUseCase';
import { CancelSubscriptionUseCase } from '../../application/usecases/CancelSubscriptionUseCase';
import { GetDigitalContentsUseCase } from '../../application/usecases/GetDigitalContentsUseCase';
import { DownloadDigitalContentUseCase } from '../../application/usecases/DownloadDigitalContentUseCase';

// Client Repositories instances (utilisent localStorage pour le token)
const productRepository = new ClientProductRepository();
const categoryRepository = new ClientCategoryRepository();
const orderRepository = new ClientOrderRepository();
const subscriptionRepository = new ClientSubscriptionRepository();
const subscriptionPlanRepository = new ClientSubscriptionPlanRepository();
const digitalContentRepository = new ClientDigitalContentRepository();

// Use Cases instances
const getProductsUseCase = new GetProductsUseCase(productRepository);
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
const getOrdersUseCase = new GetOrdersUseCase(orderRepository);
const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);
const checkoutUseCase = new CheckoutUseCase(orderRepository);
const getSubscriptionsUseCase = new GetSubscriptionsUseCase(subscriptionRepository);
const getSubscriptionPlansUseCase = new GetSubscriptionPlansUseCase(subscriptionPlanRepository);
const subscribeUseCase = new SubscribeUseCase(subscriptionRepository);
const cancelSubscriptionUseCase = new CancelSubscriptionUseCase(subscriptionRepository);
const getDigitalContentsUseCase = new GetDigitalContentsUseCase(digitalContentRepository);
const downloadDigitalContentUseCase = new DownloadDigitalContentUseCase(digitalContentRepository);

interface EcommerceContextType {
  // Products
  getProducts: typeof getProductsUseCase.execute;
  getProductById: typeof getProductByIdUseCase.execute;
  
  // Categories
  getCategories: typeof getCategoriesUseCase.execute;
  
  // Orders
  getOrders: typeof getOrdersUseCase.execute;
  getOrderById: typeof getOrderByIdUseCase.execute;
  checkout: typeof checkoutUseCase.execute;
  
  // Subscriptions
  getSubscriptions: typeof getSubscriptionsUseCase.execute;
  getSubscriptionPlans: typeof getSubscriptionPlansUseCase.execute;
  subscribe: typeof subscribeUseCase.execute;
  cancelSubscription: typeof cancelSubscriptionUseCase.execute;
  
  // Digital Content
  getDigitalContents: typeof getDigitalContentsUseCase.execute;
  downloadDigitalContent: typeof downloadDigitalContentUseCase.execute;
}

const EcommerceContext = createContext<EcommerceContextType | undefined>(undefined);

export const EcommerceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const value: EcommerceContextType = {
    // Products
    getProducts: getProductsUseCase.execute.bind(getProductsUseCase),
    getProductById: getProductByIdUseCase.execute.bind(getProductByIdUseCase),
    
    // Categories
    getCategories: getCategoriesUseCase.execute.bind(getCategoriesUseCase),
    
    // Orders
    getOrders: getOrdersUseCase.execute.bind(getOrdersUseCase),
    getOrderById: getOrderByIdUseCase.execute.bind(getOrderByIdUseCase),
    checkout: checkoutUseCase.execute.bind(checkoutUseCase),
    
    // Subscriptions
    getSubscriptions: getSubscriptionsUseCase.execute.bind(getSubscriptionsUseCase),
    getSubscriptionPlans: getSubscriptionPlansUseCase.execute.bind(getSubscriptionPlansUseCase),
    subscribe: subscribeUseCase.execute.bind(subscribeUseCase),
    cancelSubscription: cancelSubscriptionUseCase.execute.bind(cancelSubscriptionUseCase),
    
    // Digital Content
    getDigitalContents: getDigitalContentsUseCase.execute.bind(getDigitalContentsUseCase),
    downloadDigitalContent: downloadDigitalContentUseCase.execute.bind(downloadDigitalContentUseCase),
  };

  return (
    <EcommerceContext.Provider value={value}>
      {children}
    </EcommerceContext.Provider>
  );
};

export const useEcommerce = (): EcommerceContextType => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
};
