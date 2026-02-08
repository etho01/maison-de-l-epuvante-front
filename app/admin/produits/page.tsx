import React from 'react';
import AdminProductsClient from './AdminProductsClient';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetAllCategoriesUseCase } from '@/src/ecommerce/application/usecases/categories/GetAllCategoriesUseCase';
import { SymfonyCategoryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyCategoryRepository';
import { GetProductsUseCase } from '@/src/ecommerce/application/usecases/products/GetProductsUseCase';
import { SymfonyProductRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyProductRepository';

const categoryRepository = new SymfonyCategoryRepository();
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);

const productRepository = new SymfonyProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);

export default async function AdminProductsPage() {
  const allCategories = await getAllCategoriesUseCase.execute();
  const produits = await getProductsUseCase.execute({ page: 1 });

  return (
    <AdminLayout>
      <AdminProductsClient 
        allCategories={allCategories}
        initialProducts={produits.member}
        initialPagination={produits.pagination}
      />
    </AdminLayout>
  );
}
