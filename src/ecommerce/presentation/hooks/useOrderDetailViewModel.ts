'use client';

import { useEffect, useMemo, useState } from 'react';
import { OrderDetailViewModel } from '../viewmodels/OrderDetailViewModel';
import { Order } from '../../domain/entities/Order';
import { ClientOrderRepository } from '../../infrastructure/repositories/ClientOrderRepository';
import { GetOrderByIdUseCase } from '../../application/usecases/orders';

// Singletons
const orderRepository = new ClientOrderRepository();
const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);

export const useOrderDetailViewModel = (orderId: number, initialOrder?: Order) => {
  const viewModel = useMemo(
    () => new OrderDetailViewModel(getOrderByIdUseCase, orderId, initialOrder),
    [orderId, initialOrder]
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
