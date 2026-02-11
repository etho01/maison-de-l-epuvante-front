'use client';

import { useMemo, useEffect, useState } from 'react';
import { CategoryFormViewModel } from '../../viewmodels/categories/CategoryFormViewModel';
import { CreateCategoryUseCase, UpdateCategoryUseCase } from '../../../application/usecases/categories';
import { ClientCategoryRepository } from '../../../infrastructure/repositories/ClientCategoryRepository';

// Singleton repositories
const categoryRepository = new ClientCategoryRepository();
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);

export const useCategoryFormViewModel = () => {
  const viewModel = useMemo(
    () => new CategoryFormViewModel(
      createCategoryUseCase,
      updateCategoryUseCase
    ),
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
