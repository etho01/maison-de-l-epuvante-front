import React from 'react';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetCategoryByIdUseCase } from '@/src/ecommerce/application/usecases/categories/GetCategoryByIdUseCase';
import { GetAllCategoriesUseCase } from '@/src/ecommerce/application/usecases/categories/GetAllCategoriesUseCase';
import { SymfonyCategoryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyCategoryRepository';
import { notFound } from 'next/navigation';
import NotFound from '@/src/shared/components/atoms/NotFound';
import { AdminCategoryForm } from '@/src/ecommerce/presentation/components/organisms/Category/Admin/AdminCategoryForm';

const categoryRepository = new SymfonyCategoryRepository();
const getCategoryByIdUseCase = new GetCategoryByIdUseCase(categoryRepository);
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);

interface PageProps {
  params: { id: string };
}

export default async function AdminCategoryDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {

    const allCategories = await getAllCategoriesUseCase.execute();
    if (id === 'new') {
      return (
        <AdminLayout>
          <AdminCategoryForm
            allCategories={allCategories}
          />
        </AdminLayout>
      );
    }

    const category = await getCategoryByIdUseCase.execute(parseInt(id));

    return (
      <AdminLayout>
        <AdminCategoryForm
          category={category}
          allCategories={allCategories}
        />
      </AdminLayout>
    );
  } catch (error) {
    console.error('Erreur lors de la récupération de la catégorie :', error);
    return <NotFound message="Catégorie non trouvée" />;
  }
}
