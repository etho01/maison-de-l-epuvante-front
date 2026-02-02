'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProductDetailViewModel } from '../viewmodels/ProductDetailViewModel';
import { ClientProductRepository } from '../../infrastructure/repositories/ClientProductRepository';
import { GetProductsUseCase } from '../../application/usecases/GetProductsUseCase';

// Singletons
const productRepository = new ClientProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);

export const useProductDetailViewModel = (slug: string) => {
  const viewModel = useMemo(
    () => new ProductDetailViewModel(getProductsUseCase, slug),
    [slug]
  );

  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = viewModel.subscribe(() => {
      forceUpdate({});
    });

    viewModel.init();

    return unsubscribe;
  }, [viewModel]);

  return viewModel;
};
