import React from 'react';
import AdminCategoriesClient from './AdminCategoriesClient';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { SymfonyCategoryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyCategoryRepository';
import { GetAllCategoriesUseCase } from '@/src/ecommerce/application/usecases/categories/GetAllCategoriesUseCase';
import { GetCategoriesUseCase } from '@/src/ecommerce/application/usecases';

const categoryRepository = new SymfonyCategoryRepository();
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);

export default async function AdminCategoriesPage() {
  const allCategories = await getAllCategoriesUseCase.execute();
  const categories = await getCategoriesUseCase.execute();
  console.log('Fetched categories for admin page:', categories);

  return (
    <AdminLayout>
      <AdminCategoriesClient 
        allCategories={allCategories}
        initialCategories={categories.member}
        initialPagination={categories.pagination}
      />
    </AdminLayout>
  );
}
