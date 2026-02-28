'use client';

import { useMemo, useEffect, useState } from 'react';
import { DeleteAdministratorViewModel } from '../../viewmodels/administrators/DeleteAdministratorViewModel';
import { authContainer } from '@/src/auth/container';


export const useDeleteAdministratorViewModel = () => {
  const viewModel = useMemo(
    () => new DeleteAdministratorViewModel(authContainer.deleteAdministratorUseCase),
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
