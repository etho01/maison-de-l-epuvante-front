'use client';

import { useEffect, useMemo, useState } from 'react';
import { OrderDetailViewModel } from '../viewmodels/OrderDetailViewModel';
import { ClientOrderRepository } from '../../infrastructure/repositories/ClientOrderRepository';
import { GetOrderByIdUseCase } from '../../application/usecases/GetOrderByIdUseCase';

// Singletons
const orderRepository = new ClientOrderRepository();
const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);

export const useOrderDetailViewModel = (orderId: number) => {
  const viewModel = useMemo(
    () => new OrderDetailViewModel(getOrderByIdUseCase, orderId),
    [orderId]
  );

  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = viewModel.subscribe(() => {
      forceUpdate({});
    });

    viewModel.init();

    return unsubscribe;
  }, [viewModel]);

  return viewModel;
};
