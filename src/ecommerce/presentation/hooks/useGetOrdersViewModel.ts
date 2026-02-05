'use client';

import { useMemo, useEffect, useState } from 'react';
import { GetOrdersViewModel } from '../viewmodels/GetOrdersViewModel';
import { GetOrdersUseCase } from '../../application/usecases/orders';
import { ClientOrderRepository } from '../../infrastructure/repositories/ClientOrderRepository';
import { Order } from '../../domain/entities/Order';
import { Pagination } from '@/src/shared/domain/Pagination';

// Singleton repositories
const orderRepository = new ClientOrderRepository();
const getOrdersUseCase = new GetOrdersUseCase(orderRepository);

export const useGetOrdersViewModel = (initialOrders?: Order[], initialPagination?: Pagination) => {
  const viewModel = useMemo(
    () => new GetOrdersViewModel(
      getOrdersUseCase,
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
