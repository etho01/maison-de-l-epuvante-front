'use client';

import { useMemo, useEffect, useState } from 'react';
import { DeleteAdministratorViewModel } from '../../viewmodels/administrators/DeleteAdministratorViewModel';
import { DeleteAdministratorUseCase } from '../../../application/usecases/administrators';
import { ClientAdministratorRepository } from '../../../infrastructure/repositories/ClientAdministratorRepository';

const administratorRepository = new ClientAdministratorRepository();
const deleteAdministratorUseCase = new DeleteAdministratorUseCase(administratorRepository);

export const useDeleteAdministratorViewModel = () => {
  const viewModel = useMemo(
    () => new DeleteAdministratorViewModel(deleteAdministratorUseCase),
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
