'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProductsViewModel } from '../../viewmodels/products/ProductsViewModel';
import { Product } from '../../../domain/entities/Product';
import { ClientProductRepository } from '../../../infrastructure/repositories/ClientProductRepository';
import { GetProductsUseCase } from '../../../application/usecases/products';
import { Pagination } from '@/src/shared/domain/Pagination';

// Singleton
const productRepository = new ClientProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);

export const useProductsViewModel = (initialProducts?: Product[], initialPagination?: Pagination) => {
  const viewModel = useMemo(
    () => new ProductsViewModel(getProductsUseCase, initialProducts, initialPagination),
    []
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
