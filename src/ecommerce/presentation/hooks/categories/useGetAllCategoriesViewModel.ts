'use client';

import { useMemo, useEffect, useState } from 'react';
import { GetAllCategoriesViewModel } from '../../viewmodels/categories/GetAllCategoriesViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useGetAllCategoriesViewModel = () => {
  const viewModel = useMemo(
    () => new GetAllCategoriesViewModel(ecommerceContainer.getAllCategoriesUseCase),
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
