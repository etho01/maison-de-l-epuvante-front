'use client';

import { useMemo, useEffect, useState } from 'react';
import { CreateOrderViewModel } from '../../viewmodels/orders/CreateOrderViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useCreateOrderViewModel = () => {
  const viewModel = useMemo(
    () => new CreateOrderViewModel(ecommerceContainer.checkoutUseCase),
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
