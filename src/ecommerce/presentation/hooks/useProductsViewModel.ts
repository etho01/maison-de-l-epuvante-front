'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProductsViewModel } from '../viewmodels/ProductsViewModel';
import { ClientProductRepository } from '../../infrastructure/repositories/ClientProductRepository';
import { GetProductsUseCase } from '../../application/usecases/GetProductsUseCase';

// Singleton
const productRepository = new ClientProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);

export const useProductsViewModel = () => {
  const viewModel = useMemo(() => new ProductsViewModel(getProductsUseCase), []);

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
