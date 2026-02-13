'use client';

import { useMemo, useEffect, useState } from 'react';
import { CreateOrderViewModel } from '../../viewmodels/orders/CreateOrderViewModel';
import { CheckoutUseCase } from '../../../application/usecases/orders';
import { ClientOrderRepository } from '../../../infrastructure/repositories/ClientOrderRepository';

// Singleton repositories
const orderRepository = new ClientOrderRepository();
const checkoutUseCase = new CheckoutUseCase(orderRepository);

export const useCreateOrderViewModel = () => {
  const viewModel = useMemo(
    () => new CreateOrderViewModel(checkoutUseCase),
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
