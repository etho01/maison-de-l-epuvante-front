'use client';

import { useMemo, useEffect, useState } from 'react';
import { UpdateSubscriptionPlanViewModel } from '../../viewmodels/subscriptions/UpdateSubscriptionPlanViewModel';
import { UpdateSubscriptionPlanUseCase } from '../../../application/usecases/subscriptions';
import { ClientSubscriptionPlanRepository } from '../../../infrastructure/repositories/ClientSubscriptionPlanRepository';

// Singleton repositories
const subscriptionPlanRepository = new ClientSubscriptionPlanRepository();
const updateSubscriptionPlanUseCase = new UpdateSubscriptionPlanUseCase(subscriptionPlanRepository);

export const useUpdateSubscriptionPlanViewModel = () => {
  const viewModel = useMemo(
    () => new UpdateSubscriptionPlanViewModel(updateSubscriptionPlanUseCase),
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
