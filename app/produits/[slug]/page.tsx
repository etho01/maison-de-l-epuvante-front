import React from 'react';
import { SymfonyProductRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyProductRepository';
import { GetProductBySlugUseCase } from '@/src/ecommerce/application/usecases/products/GetProductBySlugUseCase';
import { ProductDetailView } from '@/src/ecommerce/presentation/components';
import NotFound from '@/src/shared/components/atoms/NotFound';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

const productRepository = new SymfonyProductRepository();
const getProductBySlugUseCase = new GetProductBySlugUseCase(productRepository);

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  let product = null;
  try {
    product = await getProductBySlugUseCase.execute(slug);
  } catch (error) {
  }

  return (
    <div className="container mx-auto px-4 py-8">
      { product ? (
        <ProductDetailView product={product} />
        ) : (
          <NotFound message="Produit non trouvé" />
        ) }
    </div>
  );
}
