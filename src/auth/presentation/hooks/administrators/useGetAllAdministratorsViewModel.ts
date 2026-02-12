'use client';

import { useMemo, useEffect, useState } from 'react';
import { Administrator } from '../../../domain/entities/Administrator';
import { GetAllAdministratorsViewModel } from '../../viewmodels/administrators/GetAllAdministratorsViewModel';
import { GetAllAdministratorsUseCase } from '../../../application/usecases/administrators';
import { ClientAdministratorRepository } from '../../../infrastructure/repositories/ClientAdministratorRepository';

const administratorRepository = new ClientAdministratorRepository();
const getAllAdministratorsUseCase = new GetAllAdministratorsUseCase(administratorRepository);

export const useGetAllAdministratorsViewModel = (initialAdministrators?: Administrator[]) => {
  const viewModel = useMemo(
    () => new GetAllAdministratorsViewModel(getAllAdministratorsUseCase, initialAdministrators),
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
