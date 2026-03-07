'use client';

import { useMemo, useEffect, useState } from 'react';
import { UpdateDeliveryStatusViewModel } from '../../viewmodels/deliveries';
import { ecommerceContainer } from '@/src/ecommerce/container';

export const useUpdateDeliveryStatusViewModel = () => {
  const viewModel = useMemo(
    () => new UpdateDeliveryStatusViewModel(ecommerceContainer.updateDeliveryStatusUseCase),
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
