'use client';

import { useMemo, useEffect, useState } from 'react';
import { GetOrderByIdViewModel } from '../viewmodels/GetOrderByIdViewModel';
import { GetOrderByIdUseCase } from '../../application/usecases/orders';
import { ClientOrderRepository } from '../../infrastructure/repositories/ClientOrderRepository';

// Singleton repositories
const orderRepository = new ClientOrderRepository();
const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);

export const useGetOrderByIdViewModel = () => {
  const viewModel = useMemo(
    () => new GetOrderByIdViewModel(getOrderByIdUseCase),
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
