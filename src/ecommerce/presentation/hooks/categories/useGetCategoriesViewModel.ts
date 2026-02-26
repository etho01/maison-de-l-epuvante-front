'use client';

import { useMemo, useEffect, useState } from 'react';
import { GetCategoriesViewModel } from '../../viewmodels/categories/GetCategoriesViewModel';
import { GetCategoriesUseCase } from '../../../application/usecases/categories';
import { ClientCategoryRepository } from '../../../infrastructure/repositories/ClientCategoryRepository';
import { Category } from '../../../domain/entities/Category';
import { Pagination } from '@/src/shared/components/ui';

// Singleton repositories
const categoryRepository = new ClientCategoryRepository();
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);

export const useGetCategoriesViewModel = (initialCategories?: Category[], initialPagination?: Pagination) => {
  const viewModel = useMemo(
    () => new GetCategoriesViewModel(
      getCategoriesUseCase,
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
