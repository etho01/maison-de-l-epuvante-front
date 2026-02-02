'use client';

import { useEffect, useMemo, useState } from 'react';
import { SubscribeViewModel } from '../viewmodels/SubscribeViewModel';
import { ClientSubscriptionRepository } from '../../infrastructure/repositories/ClientSubscriptionRepository';
import { SubscribeUseCase } from '../../application/usecases/subscriptions';

// Singletons
const subscriptionRepository = new ClientSubscriptionRepository();
const subscribeUseCase = new SubscribeUseCase(subscriptionRepository);

export const useSubscribeViewModel = () => {
  const viewModel = useMemo(() => new SubscribeViewModel(subscribeUseCase), []);

  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = viewModel.subscribe(() => {
      forceUpdate({});
    });

    return unsubscribe;
  }, [viewModel]);

  return viewModel;
};
