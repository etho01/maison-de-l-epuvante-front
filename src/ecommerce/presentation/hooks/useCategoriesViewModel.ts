'use client';

import { useEffect, useMemo, useState } from 'react';
import { CategoriesViewModel } from '../viewmodels/CategoriesViewModel';
import { ClientCategoryRepository } from '../../infrastructure/repositories/ClientCategoryRepository';
import { GetCategoriesUseCase } from '../../application/usecases/GetCategoriesUseCase';

// Singleton
const categoryRepository = new ClientCategoryRepository();
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);

export const useCategoriesViewModel = () => {
  const viewModel = useMemo(() => new CategoriesViewModel(getCategoriesUseCase), []);

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
