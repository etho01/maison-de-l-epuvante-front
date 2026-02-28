'use client';

import { useMemo, useEffect, useState } from 'react';
import { CreateCategoryViewModel } from '../../viewmodels/categories/CreateCategoryViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useCreateCategoryViewModel = () => {
  const viewModel = useMemo(
    () => new CreateCategoryViewModel(ecommerceContainer.createCategoryUseCase),
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
