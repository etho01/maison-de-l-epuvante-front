'use client';

import { useMemo, useEffect, useState } from 'react';
import { UpdateCategoryViewModel } from '../../viewmodels/categories/UpdateCategoryViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useUpdateCategoryViewModel = () => {
  const viewModel = useMemo(
    () => new UpdateCategoryViewModel(ecommerceContainer.updateCategoryUseCase),
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
