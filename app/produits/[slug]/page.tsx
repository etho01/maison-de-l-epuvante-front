import React from 'react';
import { SymfonyProductRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyProductRepository';
import { GetProductBySlugUseCase } from '@/src/ecommerce/application/usecases/products/GetProductBySlugUseCase';
import { ProductDetailView } from '@/src/ecommerce/presentation/components';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

const productRepository = new SymfonyProductRepository();
const getProductBySlugUseCase = new GetProductBySlugUseCase(productRepository);

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlugUseCase.execute(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      { product ? (
        <ProductDetailView product={product} />
        ) : (
          <div className="text-center">
            <p className="text-red-600 text-lg">Produit non trouvé</p>
          </div>
        ) }
    </div>
  );
}
