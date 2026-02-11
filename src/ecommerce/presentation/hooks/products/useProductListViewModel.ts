'use client';

import { useMemo, useEffect, useState } from 'react';
import { ProductListViewModel } from '../../viewmodels/products/ProductListViewModel';
import { GetProductsUseCase, GetProductByIdUseCase } from '../../../application/usecases/products';
import { ClientProductRepository } from '../../../infrastructure/repositories/ClientProductRepository';
import { Product } from '../../../domain/entities/Product';
import { Pagination } from '@/src/shared/domain/Pagination';

// Singleton repositories
const productRepository = new ClientProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);

export const useProductListViewModel = (initialProducts?: Product[], initialPagination?: Pagination) => {
  const viewModel = useMemo(
    () => new ProductListViewModel(
      getProductsUseCase,
      getProductByIdUseCase,
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
