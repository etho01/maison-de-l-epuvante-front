'use client';

import { useMemo, useEffect, useState } from 'react';
import { CreateProductViewModel } from '../viewmodels/CreateProductViewModel';
import { CreateProductUseCase } from '../../application/usecases/products';
import { ClientProductRepository } from '../../infrastructure/repositories/ClientProductRepository';

// Singleton repositories
const productRepository = new ClientProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);

export const useCreateProductViewModel = () => {
  const viewModel = useMemo(
    () => new CreateProductViewModel(createProductUseCase),
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
