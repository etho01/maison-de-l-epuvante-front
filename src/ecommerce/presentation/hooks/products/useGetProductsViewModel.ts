'use client';

import { useMemo, useEffect, useState } from 'react';
import { GetProductsViewModel } from '../../viewmodels/products/GetProductsViewModel';
import { GetProductsUseCase } from '../../../application/usecases/products';
import { ClientProductRepository } from '../../../infrastructure/repositories/ClientProductRepository';
import { Product } from '../../../domain/entities/Product';
import { Pagination } from '@/src/shared/domain/Pagination';

// Singleton repositories
const productRepository = new ClientProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);

export const useGetProductsViewModel = (initialProducts?: Product[], initialPagination?: Pagination) => {
  const viewModel = useMemo(
    () => new GetProductsViewModel(
      getProductsUseCase,
      initialProducts,
      initialPagination
    ),
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
