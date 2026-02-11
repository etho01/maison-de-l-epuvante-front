'use client';

import { useMemo, useEffect, useState } from 'react';
import { SubscriptionPlan } from '../../../domain/entities/SubscriptionPlan';
import { Pagination } from '@/src/shared/domain/Pagination';
import { GetSubscriptionPlansViewModel } from '../../viewmodels/subscriptions/GetSubscriptionPlansViewModel';
import { GetSubscriptionPlansUseCase } from '../../../application/usecases/subscriptions';
import { ClientSubscriptionPlanRepository } from '../../../infrastructure/repositories/ClientSubscriptionPlanRepository';

// Singleton repositories
const subscriptionPlanRepository = new ClientSubscriptionPlanRepository();
const getSubscriptionPlansUseCase = new GetSubscriptionPlansUseCase(subscriptionPlanRepository);

export const useGetSubscriptionPlansViewModel = (
  initialPlans?: SubscriptionPlan[],
  initialPagination?: Pagination
) => {
  const viewModel = useMemo(
    () => new GetSubscriptionPlansViewModel(getSubscriptionPlansUseCase, initialPlans, initialPagination),
    [initialPlans, initialPagination]
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
