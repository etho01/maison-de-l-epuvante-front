'use client';

import { useMemo, useEffect, useState } from 'react';
import { DeleteCategoryViewModel } from '../../viewmodels/categories/DeleteCategoryViewModel';
import { DeleteCategoryUseCase } from '../../../application/usecases/categories';
import { ClientCategoryRepository } from '../../../infrastructure/repositories/ClientCategoryRepository';

// Singleton repositories
const categoryRepository = new ClientCategoryRepository();
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

export const useDeleteCategoryViewModel = () => {
  const viewModel = useMemo(
    () => new DeleteCategoryViewModel(deleteCategoryUseCase),
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
