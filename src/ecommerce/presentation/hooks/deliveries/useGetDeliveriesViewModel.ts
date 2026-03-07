'use client';

import { useMemo, useEffect, useState } from 'react';
import { GetDeliveriesViewModel } from '../../viewmodels/deliveries';
import { ecommerceContainer } from '@/src/ecommerce/container';
import { Delivery } from '@/src/ecommerce/domain/entities/Devivery';
import { Pagination } from '@/src/shared/domain/Pagination';

export const useGetDeliveriesViewModel = (
  initialDeliveries?: Delivery[],
  initialPagination?: Pagination
) => {
  const viewModel = useMemo(
    () => new GetDeliveriesViewModel(
      ecommerceContainer.getDeliveriesUseCase,
      initialDeliveries,
      initialPagination
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
