'use client';

import { useMemo, useEffect, useState } from 'react';
import { CreateProductViewModel } from '../../viewmodels/products/CreateProductViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useCreateProductViewModel = () => {
  const viewModel = useMemo(
    () => new CreateProductViewModel(ecommerceContainer.createProductUseCase),
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
