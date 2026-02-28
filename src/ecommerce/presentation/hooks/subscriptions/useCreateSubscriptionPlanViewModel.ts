'use client';

import { useMemo, useEffect, useState } from 'react';
import { CreateSubscriptionPlanViewModel } from '../../viewmodels/subscriptions/CreateSubscriptionPlanViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useCreateSubscriptionPlanViewModel = () => {
  const viewModel = useMemo(
    () => new CreateSubscriptionPlanViewModel(ecommerceContainer.createSubscriptionPlanUseCase),
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
