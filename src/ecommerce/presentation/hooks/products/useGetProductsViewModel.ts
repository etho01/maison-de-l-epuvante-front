'use client';

import { useMemo, useEffect, useState } from 'react';
import { GetProductsViewModel } from '../../viewmodels/products/GetProductsViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';
import { Product } from '../../../domain/entities/Product';
import { Pagination } from '@/src/shared/domain/Pagination';


export const useGetProductsViewModel = (initialProducts?: Product[], initialPagination?: Pagination) => {
  const viewModel = useMemo(
    () => new GetProductsViewModel(
      ecommerceContainer.getProductsUseCase,
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
