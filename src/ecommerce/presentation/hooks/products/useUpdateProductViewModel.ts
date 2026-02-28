'use client';

import { useMemo, useEffect, useState } from 'react';
import { UpdateProductViewModel } from '../../viewmodels/products/UpdateProductViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useUpdateProductViewModel = () => {
  const viewModel = useMemo(
    () => new UpdateProductViewModel(ecommerceContainer.updateProductUseCase),
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
