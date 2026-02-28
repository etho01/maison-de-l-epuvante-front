'use client';

import { useMemo, useEffect, useState } from 'react';
import { UpdateOrderViewModel } from '../../viewmodels/orders/UpdateOrderViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useUpdateOrderViewModel = () => {
  const viewModel = useMemo(
    () => new UpdateOrderViewModel(ecommerceContainer.updateOrderUseCase),
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
