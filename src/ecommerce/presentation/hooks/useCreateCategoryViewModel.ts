'use client';

import { useMemo, useEffect, useState } from 'react';
import { CreateCategoryViewModel } from '../viewmodels/CreateCategoryViewModel';
import { CreateCategoryUseCase } from '../../application/usecases/categories';
import { ClientCategoryRepository } from '../../infrastructure/repositories/ClientCategoryRepository';

// Singleton repositories
const categoryRepository = new ClientCategoryRepository();
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

export const useCreateCategoryViewModel = () => {
  const viewModel = useMemo(
    () => new CreateCategoryViewModel(createCategoryUseCase),
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
