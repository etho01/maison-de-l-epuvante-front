'use client';

import { useMemo, useEffect, useState } from 'react';
import { OrderListViewModel } from '../viewmodels/OrderListViewModel';
import { GetOrdersUseCase, GetOrderByIdUseCase } from '../../application/usecases/orders';
import { ClientOrderRepository } from '../../infrastructure/repositories/ClientOrderRepository';
import { Order } from '../../domain/entities/Order';
import { Pagination } from '@/src/shared/domain/Pagination';

// Singleton repositories
const orderRepository = new ClientOrderRepository();
const getOrdersUseCase = new GetOrdersUseCase(orderRepository);
const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);

export const useOrderListViewModel = (initialOrders?: Order[], initialPagination?: Pagination) => {
  const viewModel = useMemo(
    () => new OrderListViewModel(
      getOrdersUseCase,
      getOrderByIdUseCase,
      initialOrders,
      initialPagination
    ),
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
