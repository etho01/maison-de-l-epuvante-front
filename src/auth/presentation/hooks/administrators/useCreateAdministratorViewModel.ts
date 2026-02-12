'use client';

import { useMemo, useEffect, useState } from 'react';
import { CreateAdministratorViewModel } from '../../viewmodels/administrators/CreateAdministratorViewModel';
import { CreateAdministratorUseCase } from '../../../application/usecases/administrators';
import { ClientAdministratorRepository } from '../../../infrastructure/repositories/ClientAdministratorRepository';

const administratorRepository = new ClientAdministratorRepository();
const createAdministratorUseCase = new CreateAdministratorUseCase(administratorRepository);

export const useCreateAdministratorViewModel = () => {
  const viewModel = useMemo(
    () => new CreateAdministratorViewModel(createAdministratorUseCase),
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
