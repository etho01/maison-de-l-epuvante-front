'use client';

import { useMemo, useEffect, useState } from 'react';
import { GetAllCategoriesViewModel } from '../../viewmodels/categories/GetAllCategoriesViewModel';
import { GetAllCategoriesUseCase } from '../../../application/usecases/categories';
import { ClientCategoryRepository } from '../../../infrastructure/repositories/ClientCategoryRepository';

// Singleton repositories
const categoryRepository = new ClientCategoryRepository();
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);

export const useGetAllCategoriesViewModel = () => {
  const viewModel = useMemo(
    () => new GetAllCategoriesViewModel(getAllCategoriesUseCase),
    []
  );

  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = viewModel.subscribe(() => {
      forceUpdate({});
    });

    return unsubscribe;
  }, [viewModel]);

  return viewModel;
};
