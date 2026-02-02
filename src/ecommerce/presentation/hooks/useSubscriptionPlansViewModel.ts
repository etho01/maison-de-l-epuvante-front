'use client';

import { useEffect, useMemo, useState } from 'react';
import { SubscriptionPlansViewModel } from '../viewmodels/SubscriptionPlansViewModel';
import { ClientSubscriptionPlanRepository } from '../../infrastructure/repositories/ClientSubscriptionPlanRepository';
import { GetSubscriptionPlansUseCase } from '../../application/usecases/GetSubscriptionPlansUseCase';

// Singletons
const subscriptionPlanRepository = new ClientSubscriptionPlanRepository();
const getSubscriptionPlansUseCase = new GetSubscriptionPlansUseCase(subscriptionPlanRepository);

export const useSubscriptionPlansViewModel = () => {
  const viewModel = useMemo(
    () => new SubscriptionPlansViewModel(getSubscriptionPlansUseCase),
    []
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
