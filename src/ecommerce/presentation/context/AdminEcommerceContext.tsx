'use client';

import React, { createContext, useContext, useMemo, ReactNode } from 'react';

// Repositories
import { ClientProductRepository } from '../../infrastructure/repositories/ClientProductRepository';
import { ClientCategoryRepository } from '../../infrastructure/repositories/ClientCategoryRepository';
import { ClientOrderRepository } from '../../infrastructure/repositories/ClientOrderRepository';

// Use Cases - Products
import {
  GetProductsUseCase,
  GetProductByIdUseCase,
  CreateProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '../../application/usecases/products';

// Use Cases - Categories
import {
  GetCategoriesUseCase,
  GetAllCategoriesUseCase,
  GetCategoryByIdUseCase,
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
  DeleteCategoryUseCase,
} from '../../application/usecases/categories';

// Use Cases - Orders
import {
  GetOrdersUseCase,
  GetOrderByIdUseCase,
  UpdateOrderUseCase,
} from '../../application/usecases/orders';

interface AdminEcommerceContextValue {
  // Products
  getProducts: GetProductsUseCase;
  getProductById: GetProductByIdUseCase;
  createProduct: CreateProductUseCase;
  updateProduct: UpdateProductUseCase;
  deleteProduct: DeleteProductUseCase;
  
  // Categories
  getCategories: GetCategoriesUseCase;
  getAllCategories: GetAllCategoriesUseCase;
  getCategoryById: GetCategoryByIdUseCase;
  createCategory: CreateCategoryUseCase;
  updateCategory: UpdateCategoryUseCase;
  deleteCategory: DeleteCategoryUseCase;
  
  // Orders
  getOrders: GetOrdersUseCase;
  getOrderById: GetOrderByIdUseCase;
  updateOrder: UpdateOrderUseCase;
}

const AdminEcommerceContext = createContext<AdminEcommerceContextValue | undefined>(undefined);

export const AdminEcommerceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const value = useMemo(() => {
    // Initialize repositories
    const productRepository = new ClientProductRepository();
    const categoryRepository = new ClientCategoryRepository();
    const orderRepository = new ClientOrderRepository();

    // Return all use cases
    return {
      // Products
      getProducts: new GetProductsUseCase(productRepository),
      getProductById: new GetProductByIdUseCase(productRepository),
      createProduct: new CreateProductUseCase(productRepository),
      updateProduct: new UpdateProductUseCase(productRepository),
      deleteProduct: new DeleteProductUseCase(productRepository),
      
      // Categories
      getCategories: new GetCategoriesUseCase(categoryRepository),
      getAllCategories: new GetAllCategoriesUseCase(categoryRepository),
      getCategoryById: new GetCategoryByIdUseCase(categoryRepository),
      createCategory: new CreateCategoryUseCase(categoryRepository),
      updateCategory: new UpdateCategoryUseCase(categoryRepository),
      deleteCategory: new DeleteCategoryUseCase(categoryRepository),
      
      // Orders
      getOrders: new GetOrdersUseCase(orderRepository),
      getOrderById: new GetOrderByIdUseCase(orderRepository),
      updateOrder: new UpdateOrderUseCase(orderRepository),
    };
  }, []);

  return (
    <AdminEcommerceContext.Provider value={value}>
      {children}
    </AdminEcommerceContext.Provider>
  );
};

export const useAdminEcommerce = () => {
  const context = useContext(AdminEcommerceContext);
  if (!context) {
    throw new Error('useAdminEcommerce must be used within AdminEcommerceProvider');
  }
  return context;
};
