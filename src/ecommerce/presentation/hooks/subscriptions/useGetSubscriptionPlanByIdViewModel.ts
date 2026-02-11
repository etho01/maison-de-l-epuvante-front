'use client';

import { useMemo, useEffect, useState } from 'react';
import { GetSubscriptionPlanByIdViewModel } from '../../viewmodels/subscriptions/GetSubscriptionPlanByIdViewModel';
import { GetSubscriptionPlanByIdUseCase } from '../../../application/usecases/subscriptions';
import { ClientSubscriptionPlanRepository } from '../../../infrastructure/repositories/ClientSubscriptionPlanRepository';

// Singleton repositories
const subscriptionPlanRepository = new ClientSubscriptionPlanRepository();
const getSubscriptionPlanByIdUseCase = new GetSubscriptionPlanByIdUseCase(subscriptionPlanRepository);

export const useGetSubscriptionPlanByIdViewModel = () => {
  const viewModel = useMemo(
    () => new GetSubscriptionPlanByIdViewModel(getSubscriptionPlanByIdUseCase),
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
