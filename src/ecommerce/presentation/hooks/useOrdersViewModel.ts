'use client';

import { useEffect, useMemo, useState } from 'react';
import { OrdersViewModel } from '../viewmodels/OrdersViewModel';
import { Order } from '../../domain/entities/Order';
import { ClientOrderRepository } from '../../infrastructure/repositories/ClientOrderRepository';
import { GetOrdersUseCase } from '../../application/usecases/orders';
import { Pagination } from '@/src/shared/domain/Pagination';

// Singletons
const orderRepository = new ClientOrderRepository();
const getOrdersUseCase = new GetOrdersUseCase(orderRepository);

export const useOrdersViewModel = (initialOrders?: Order[], initialPagination?: Pagination) => {
  const viewModel = useMemo(
    () => new OrdersViewModel(getOrdersUseCase, initialOrders, initialPagination),
    []
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
