'use client';

import { useEffect, useMemo, useState } from 'react';
import { SubscribeViewModel } from '../../viewmodels/subscriptions/SubscribeViewModel';
import { ecommerceContainer } from '@/src/ecommerce/container';


export const useSubscribeViewModel = () => {
  const viewModel = useMemo(() => new SubscribeViewModel(ecommerceContainer.subscribeUseCase), []);

  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = viewModel.subscribe(() => {
      forceUpdate({});
    });

    return unsubscribe;
  }, [viewModel]);

  return viewModel;
};
