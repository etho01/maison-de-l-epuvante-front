'use client';

import { useMemo, useEffect, useState } from 'react';
import { DeleteSubscriptionPlanViewModel } from '../../viewmodels/subscriptions/DeleteSubscriptionPlanViewModel';
import { DeleteSubscriptionPlanUseCase } from '../../../application/usecases/subscriptions';
import { ClientSubscriptionPlanRepository } from '../../../infrastructure/repositories/ClientSubscriptionPlanRepository';

// Singleton repositories
const subscriptionPlanRepository = new ClientSubscriptionPlanRepository();
const deleteSubscriptionPlanUseCase = new DeleteSubscriptionPlanUseCase(subscriptionPlanRepository);

export const useDeleteSubscriptionPlanViewModel = () => {
  const viewModel = useMemo(
    () => new DeleteSubscriptionPlanViewModel(deleteSubscriptionPlanUseCase),
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
