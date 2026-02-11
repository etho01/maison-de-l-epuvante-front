'use client';

import { useEffect, useMemo, useState } from 'react';
import { SubscriptionPlansViewModel } from '../../viewmodels/subscriptions/SubscriptionPlansViewModel';
import { SubscriptionPlan } from '../../../domain/entities/SubscriptionPlan';
import { ClientSubscriptionPlanRepository } from '../../../infrastructure/repositories/ClientSubscriptionPlanRepository';
import { GetSubscriptionPlansUseCase } from '../../../application/usecases/subscriptions';
import { Pagination } from '@/src/shared/domain/Pagination';

// Singletons
const subscriptionPlanRepository = new ClientSubscriptionPlanRepository();
const getSubscriptionPlansUseCase = new GetSubscriptionPlansUseCase(subscriptionPlanRepository);

export const useSubscriptionPlansViewModel = (initialPlans?: SubscriptionPlan[], initialPagination?: Pagination) => {
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
