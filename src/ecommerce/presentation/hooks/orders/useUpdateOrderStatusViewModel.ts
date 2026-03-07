'use client';

import { useMemo, useEffect, useState } from 'react';
import { UpdateOrderStatusViewModel } from '../../viewmodels/orders/UpdateOrderStatusViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';

export const useUpdateOrderStatusViewModel = () => {
  const viewModel = useMemo(
    () => new UpdateOrderStatusViewModel(ecommerceContainer.updateOrderStatusUseCase),
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
