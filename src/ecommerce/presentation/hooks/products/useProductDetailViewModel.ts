'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProductDetailViewModel } from '../../viewmodels/products/ProductDetailViewModel';
import { Product } from '../../../domain/entities/Product';
import { ClientProductRepository } from '../../../infrastructure/repositories/ClientProductRepository';
import { GetProductsUseCase } from '../../../application/usecases/products';

// Singletons
const productRepository = new ClientProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);

export const useProductDetailViewModel = (slug: string, initialProduct?: Product) => {
  const viewModel = useMemo(
    () => new ProductDetailViewModel(getProductsUseCase, slug, initialProduct),
    [slug, initialProduct]
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
