'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { ecommerceContainer } from '@/src/ecommerce/container';

interface EcommerceContextType {
  // Products
  getProducts: typeof ecommerceContainer.getProductsUseCase.execute;
  getProductById: typeof ecommerceContainer.getProductByIdUseCase.execute;

  // Categories
  getCategories: typeof ecommerceContainer.getCategoriesUseCase.execute;

  // Orders
  getOrders: typeof ecommerceContainer.getOrdersUseCase.execute;
  getOrderById: typeof ecommerceContainer.getOrderByIdUseCase.execute;
  checkout: typeof ecommerceContainer.checkoutUseCase.execute;

  // Subscriptions
  getSubscriptions: typeof ecommerceContainer.getSubscriptionsUseCase.execute;
  getSubscriptionPlans: typeof ecommerceContainer.getSubscriptionPlansUseCase.execute;
  subscribe: typeof ecommerceContainer.subscribeUseCase.execute;
  cancelSubscription: typeof ecommerceContainer.cancelSubscriptionUseCase.execute;

  // Digital Content
  getDigitalContents: typeof ecommerceContainer.getDigitalContentsUseCase.execute;
  downloadDigitalContent: typeof ecommerceContainer.downloadDigitalContentUseCase.execute;
}

const EcommerceContext = createContext<EcommerceContextType | undefined>(undefined);

export const EcommerceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const value: EcommerceContextType = {
    // Products
    getProducts:    ecommerceContainer.getProductsUseCase.execute.bind(ecommerceContainer.getProductsUseCase),
    getProductById: ecommerceContainer.getProductByIdUseCase.execute.bind(ecommerceContainer.getProductByIdUseCase),

    // Categories
    getCategories: ecommerceContainer.getCategoriesUseCase.execute.bind(ecommerceContainer.getCategoriesUseCase),

    // Orders
    getOrders:   ecommerceContainer.getOrdersUseCase.execute.bind(ecommerceContainer.getOrdersUseCase),
    getOrderById: ecommerceContainer.getOrderByIdUseCase.execute.bind(ecommerceContainer.getOrderByIdUseCase),
    checkout:    ecommerceContainer.checkoutUseCase.execute.bind(ecommerceContainer.checkoutUseCase),

    // Subscriptions
    getSubscriptions:    ecommerceContainer.getSubscriptionsUseCase.execute.bind(ecommerceContainer.getSubscriptionsUseCase),
    getSubscriptionPlans: ecommerceContainer.getSubscriptionPlansUseCase.execute.bind(ecommerceContainer.getSubscriptionPlansUseCase),
    subscribe:           ecommerceContainer.subscribeUseCase.execute.bind(ecommerceContainer.subscribeUseCase),
    cancelSubscription:  ecommerceContainer.cancelSubscriptionUseCase.execute.bind(ecommerceContainer.cancelSubscriptionUseCase),

    // Digital Content
    getDigitalContents:     ecommerceContainer.getDigitalContentsUseCase.execute.bind(ecommerceContainer.getDigitalContentsUseCase),
    downloadDigitalContent: ecommerceContainer.downloadDigitalContentUseCase.execute.bind(ecommerceContainer.downloadDigitalContentUseCase),
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
