'use client';

import { useMemo, useEffect, useState } from 'react';
import { CreateAdministratorViewModel } from '../../viewmodels/administrators/CreateAdministratorViewModel';
import { authContainer } from '@/src/auth/container';


export const useCreateAdministratorViewModel = () => {
  const viewModel = useMemo(
    () => new CreateAdministratorViewModel(authContainer.createAdministratorUseCase),
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
