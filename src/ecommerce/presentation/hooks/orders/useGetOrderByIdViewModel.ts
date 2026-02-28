'use client';

import { useMemo, useEffect, useState } from 'react';
import { GetOrderByIdViewModel } from '../../viewmodels/orders/GetOrderByIdViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useGetOrderByIdViewModel = () => {
  const viewModel = useMemo(
    () => new GetOrderByIdViewModel(ecommerceContainer.getOrderByIdUseCase),
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
