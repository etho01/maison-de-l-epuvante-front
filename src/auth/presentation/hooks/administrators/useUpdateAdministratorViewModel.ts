'use client';

import { useMemo, useEffect, useState } from 'react';
import { UpdateAdministratorViewModel } from '../../viewmodels/administrators/UpdateAdministratorViewModel';
import { UpdateAdministratorUseCase } from '../../../application/usecases/administrators';
import { ClientAdministratorRepository } from '../../../infrastructure/repositories/ClientAdministratorRepository';

const administratorRepository = new ClientAdministratorRepository();
const updateAdministratorUseCase = new UpdateAdministratorUseCase(administratorRepository);

export const useUpdateAdministratorViewModel = () => {
  const viewModel = useMemo(
    () => new UpdateAdministratorViewModel(updateAdministratorUseCase),
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
