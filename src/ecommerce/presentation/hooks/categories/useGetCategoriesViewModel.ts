'use client';

import { useMemo, useEffect, useState } from 'react';
import { GetCategoriesViewModel } from '../../viewmodels/categories/GetCategoriesViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';
import { Category } from '../../../domain/entities/Category';
import { Pagination } from '@/src/shared/components/ui';


export const useGetCategoriesViewModel = (initialCategories?: Category[], initialPagination?: Pagination) => {
  const viewModel = useMemo(
    () => new GetCategoriesViewModel(
      ecommerceContainer.getCategoriesUseCase,
      initialCategories,
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
