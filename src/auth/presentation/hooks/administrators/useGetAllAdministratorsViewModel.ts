'use client';

import { useMemo, useEffect, useState } from 'react';
import { Administrator } from '../../../domain/entities/Administrator';
import { GetAllAdministratorsViewModel } from '../../viewmodels/administrators/GetAllAdministratorsViewModel';
import { authContainer } from '@/src/auth/container';


export const useGetAllAdministratorsViewModel = (initialAdministrators?: Administrator[]) => {
  const viewModel = useMemo(
    () => new GetAllAdministratorsViewModel(authContainer.getAllAdministratorsUseCase, initialAdministrators),
    [initialAdministrators]
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
