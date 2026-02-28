'use client';

import { useMemo, useEffect, useState } from 'react';
import { UpdateSubscriptionPlanViewModel } from '../../viewmodels/subscriptions/UpdateSubscriptionPlanViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useUpdateSubscriptionPlanViewModel = () => {
  const viewModel = useMemo(
    () => new UpdateSubscriptionPlanViewModel(ecommerceContainer.updateSubscriptionPlanUseCase),
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
