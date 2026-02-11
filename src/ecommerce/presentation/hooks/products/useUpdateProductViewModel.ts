'use client';

import { useMemo, useEffect, useState } from 'react';
import { UpdateProductViewModel } from '../../viewmodels/products/UpdateProductViewModel';
import { UpdateProductUseCase } from '../../../application/usecases/products';
import { ClientProductRepository } from '../../../infrastructure/repositories/ClientProductRepository';

// Singleton repositories
const productRepository = new ClientProductRepository();
const updateProductUseCase = new UpdateProductUseCase(productRepository);

export const useUpdateProductViewModel = () => {
  const viewModel = useMemo(
    () => new UpdateProductViewModel(updateProductUseCase),
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
