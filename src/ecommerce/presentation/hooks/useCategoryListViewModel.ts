'use client';

import { useMemo, useEffect, useState } from 'react';
import { GetCategoriesViewModel } from '../viewmodels/GetCategoriesViewModel';
import { GetCategoriesUseCase } from '../../application/usecases/categories';
import { ClientCategoryRepository } from '../../infrastructure/repositories/ClientCategoryRepository';
import { Category } from '../../domain/entities/Category';

// Singleton repositories
const categoryRepository = new ClientCategoryRepository();
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);

export const useGetCategoriesViewModel = (initialCategories?: Category[]) => {
  const viewModel = useMemo(
    () => new GetCategoriesViewModel(
      getCategoriesUseCase,
      initialCategories
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
