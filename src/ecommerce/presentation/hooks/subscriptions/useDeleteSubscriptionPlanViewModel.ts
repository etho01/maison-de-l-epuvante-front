'use client';

import { useMemo, useEffect, useState } from 'react';
import { DeleteSubscriptionPlanViewModel } from '../../viewmodels/subscriptions/DeleteSubscriptionPlanViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useDeleteSubscriptionPlanViewModel = () => {
  const viewModel = useMemo(
    () => new DeleteSubscriptionPlanViewModel(ecommerceContainer.deleteSubscriptionPlanUseCase),
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
