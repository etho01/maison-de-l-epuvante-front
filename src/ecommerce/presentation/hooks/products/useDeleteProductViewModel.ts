'use client';

import { useMemo, useEffect, useState } from 'react';
import { DeleteProductViewModel } from '../../viewmodels/products/DeleteProductViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useDeleteProductViewModel = () => {
  const viewModel = useMemo(
    () => new DeleteProductViewModel(ecommerceContainer.deleteProductUseCase),
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
