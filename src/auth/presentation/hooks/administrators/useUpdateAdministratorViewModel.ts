'use client';

import { useMemo, useEffect, useState } from 'react';
import { UpdateAdministratorViewModel } from '../../viewmodels/administrators/UpdateAdministratorViewModel';
import { authContainer } from '@/src/auth/container';


export const useUpdateAdministratorViewModel = () => {
  const viewModel = useMemo(
    () => new UpdateAdministratorViewModel(authContainer.updateAdministratorUseCase),
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
