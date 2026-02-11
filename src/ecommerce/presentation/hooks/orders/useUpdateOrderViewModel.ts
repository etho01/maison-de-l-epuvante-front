'use client';

import { useMemo, useEffect, useState } from 'react';
import { UpdateOrderViewModel } from '../../viewmodels/orders/UpdateOrderViewModel';
import { UpdateOrderUseCase } from '../../../application/usecases/orders';
import { ClientOrderRepository } from '../../../infrastructure/repositories/ClientOrderRepository';

// Singleton repositories
const orderRepository = new ClientOrderRepository();
const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);

export const useUpdateOrderViewModel = () => {
  const viewModel = useMemo(
    () => new UpdateOrderViewModel(updateOrderUseCase),
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
