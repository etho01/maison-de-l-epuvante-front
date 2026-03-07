import React from 'react';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetProductByIdUseCase } from '@/src/ecommerce/application/usecases/products/GetProductByIdUseCase';
import { GetAllCategoriesUseCase } from '@/src/ecommerce/application/usecases/categories/GetAllCategoriesUseCase';
import { SymfonyProductRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyProductRepository';
import { SymfonyCategoryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyCategoryRepository';
import { notFound } from 'next/navigation';
import NotFound from '@/src/shared/components/atoms/NotFound';
import { AdminProductForm } from '@/src/ecommerce/presentation/components/organisms/Product/Admin/AdminProductForm';

const productRepository = new SymfonyProductRepository();
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
const categoryRepository = new SymfonyCategoryRepository();
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);

interface PageProps {
  params: { id: string };
}

export default async function AdminProductDetailPage({ params }: PageProps) {
  const { id } = await params;


  try {
    const allCategories = await getAllCategoriesUseCase.execute();

    if (id === 'new') {
      return (
        <AdminLayout>
          <AdminProductForm
            allCategories={allCategories}
          />
        </AdminLayout>
      );
    }

    const product = await getProductByIdUseCase.execute(parseInt(id));

    return (
      <AdminLayout>
        <AdminProductForm
          product={product}
          allCategories={allCategories}
        />
      </AdminLayout>
    );
  } catch (error) {
    console.error('Erreur lors de la récupération du produit :', error);
    return <NotFound message="Produit non trouvé" />;
  }
}
