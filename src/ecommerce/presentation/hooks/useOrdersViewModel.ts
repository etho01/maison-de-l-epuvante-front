'use client';

import { useEffect, useMemo, useState } from 'react';
import { OrdersViewModel } from '../viewmodels/OrdersViewModel';
import { ClientOrderRepository } from '../../infrastructure/repositories/ClientOrderRepository';
import { GetOrdersUseCase } from '../../application/usecases/GetOrdersUseCase';

// Singletons
const orderRepository = new ClientOrderRepository();
const getOrdersUseCase = new GetOrdersUseCase(orderRepository);

export const useOrdersViewModel = () => {
  const viewModel = useMemo(() => new OrdersViewModel(getOrdersUseCase), []);

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
