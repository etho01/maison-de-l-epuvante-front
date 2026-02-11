'use client';

import { useMemo, useEffect, useState } from 'react';
import { DeleteProductViewModel } from '../../viewmodels/products/DeleteProductViewModel';
import { DeleteProductUseCase } from '../../../application/usecases/products';
import { ClientProductRepository } from '../../../infrastructure/repositories/ClientProductRepository';

// Singleton repositories
const productRepository = new ClientProductRepository();
const deleteProductUseCase = new DeleteProductUseCase(productRepository);

export const useDeleteProductViewModel = () => {
  const viewModel = useMemo(
    () => new DeleteProductViewModel(deleteProductUseCase),
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
