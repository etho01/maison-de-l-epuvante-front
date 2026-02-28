'use client';

import { useMemo, useEffect, useState } from 'react';
import { GetSubscriptionPlanByIdViewModel } from '../../viewmodels/subscriptions/GetSubscriptionPlanByIdViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useGetSubscriptionPlanByIdViewModel = () => {
  const viewModel = useMemo(
    () => new GetSubscriptionPlanByIdViewModel(ecommerceContainer.getSubscriptionPlanByIdUseCase),
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
