import React from 'react';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetAllCategoriesUseCase } from '@/src/ecommerce/application/usecases/categories/GetAllCategoriesUseCase';
import { SymfonyCategoryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyCategoryRepository';
import { GetProductsUseCase } from '@/src/ecommerce/application/usecases/products/GetProductsUseCase';
import { SymfonyProductRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyProductRepository';
import { AdminProductList } from '@/src/ecommerce/presentation/components';

const categoryRepository = new SymfonyCategoryRepository();

const productRepository = new SymfonyProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);

export default async function AdminProductsPage() {
  const produits = await getProductsUseCase.execute({ page: 1 });

  return (
    <AdminLayout>
      <AdminProductList
        initialProducts={produits.member}
        initialPagination={produits.pagination}
      />
    </AdminLayout>
  );
}
