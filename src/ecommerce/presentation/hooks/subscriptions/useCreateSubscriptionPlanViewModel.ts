'use client';

import { useMemo, useEffect, useState } from 'react';
import { CreateSubscriptionPlanViewModel } from '../../viewmodels/subscriptions/CreateSubscriptionPlanViewModel';
import { CreateSubscriptionPlanUseCase } from '../../../application/usecases/subscriptions';
import { ClientSubscriptionPlanRepository } from '../../../infrastructure/repositories/ClientSubscriptionPlanRepository';

// Singleton repositories
const subscriptionPlanRepository = new ClientSubscriptionPlanRepository();
const createSubscriptionPlanUseCase = new CreateSubscriptionPlanUseCase(subscriptionPlanRepository);

export const useCreateSubscriptionPlanViewModel = () => {
  const viewModel = useMemo(
    () => new CreateSubscriptionPlanViewModel(createSubscriptionPlanUseCase),
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
