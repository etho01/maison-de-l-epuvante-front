'use client';

import { useMemo, useEffect, useState } from 'react';
import { OrderDetailViewModel } from '../../viewmodels/orders/OrderDetailViewModel';
import { GetOrderByIdUseCase, UpdateOrderUseCase } from '../../../application/usecases/orders';
import { ClientOrderRepository } from '../../../infrastructure/repositories/ClientOrderRepository';

// Singleton repositories
const orderRepository = new ClientOrderRepository();
const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);
const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);

export const useOrderDetailViewModel = () => {
  const viewModel = useMemo(
    () => new OrderDetailViewModel(
      getOrderByIdUseCase,
      updateOrderUseCase
    ),
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
