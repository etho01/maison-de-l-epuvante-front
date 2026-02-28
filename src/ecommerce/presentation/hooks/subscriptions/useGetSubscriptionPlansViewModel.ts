'use client';

import { useMemo, useEffect, useState } from 'react';
import { SubscriptionPlan } from '../../../domain/entities/SubscriptionPlan';
import { Pagination } from '@/src/shared/domain/Pagination';
import { GetSubscriptionPlansViewModel } from '../../viewmodels/subscriptions/GetSubscriptionPlansViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useGetSubscriptionPlansViewModel = (
  initialPlans?: SubscriptionPlan[],
  initialPagination?: Pagination
) => {
  const viewModel = useMemo(
    () => new GetSubscriptionPlansViewModel(ecommerceContainer.getSubscriptionPlansUseCase, initialPlans, initialPagination),
    [initialPlans, initialPagination]
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
