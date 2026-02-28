'use client';

import { useMemo, useEffect, useState } from 'react';
import { GetOrdersViewModel } from '../../viewmodels/orders/GetOrdersViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';
import { Order } from '../../../domain/entities/Order';
import { Pagination } from '@/src/shared/domain/Pagination';


export const useGetOrdersViewModel = (initialOrders?: Order[], initialPagination?: Pagination) => {
  const viewModel = useMemo(
    () => new GetOrdersViewModel(
      ecommerceContainer.getOrdersUseCase,
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
