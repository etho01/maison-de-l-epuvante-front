'use client';

import { useEffect, useMemo, useState } from 'react';
import { SubscriptionPlansViewModel } from '../viewmodels/SubscriptionPlansViewModel';
import { SubscriptionPlan } from '../../domain/entities/SubscriptionPlan';
import { ClientSubscriptionPlanRepository } from '../../infrastructure/repositories/ClientSubscriptionPlanRepository';
import { GetSubscriptionPlansUseCase } from '../../application/usecases/subscriptions';

// Singletons
const subscriptionPlanRepository = new ClientSubscriptionPlanRepository();
const getSubscriptionPlansUseCase = new GetSubscriptionPlansUseCase(subscriptionPlanRepository);

export const useSubscriptionPlansViewModel = (initialPlans?: SubscriptionPlan[]) => {
  const viewModel = useMemo(
    () => new SubscriptionPlansViewModel(getSubscriptionPlansUseCase, initialPlans),
    [initialPlans]
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
