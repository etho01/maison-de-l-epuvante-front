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

  let product = null;
  try {
    product = await getProductBySlugUseCase.execute(slug);
    console.log('Product found:', product);
  } catch (error) {
  }

  console.log('Product:', product ? product : 'Not found');

  return (
    <div className="container mx-auto px-4 py-8">
      { product ? (
        <ProductDetailView product={product} />
        ) : (
          <div className="text-center glass-effect border border-crimson-900/30 rounded-2xl p-12 max-w-md mx-auto">
            <svg className="w-16 h-16 mx-auto mb-4 text-crimson-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-neutral-100 text-lg font-semibold">Produit non trouvé</p>
          </div>
        ) }
    </div>
  );
}
