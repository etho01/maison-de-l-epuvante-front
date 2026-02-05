'use client';

import { useMemo, useEffect, useState } from 'react';
import { UpdateCategoryViewModel } from '../viewmodels/UpdateCategoryViewModel';
import { UpdateCategoryUseCase } from '../../application/usecases/categories';
import { ClientCategoryRepository } from '../../infrastructure/repositories/ClientCategoryRepository';

// Singleton repositories
const categoryRepository = new ClientCategoryRepository();
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);

export const useUpdateCategoryViewModel = () => {
  const viewModel = useMemo(
    () => new UpdateCategoryViewModel(updateCategoryUseCase),
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
