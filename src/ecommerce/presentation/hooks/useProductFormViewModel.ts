'use client';

import { useMemo, useEffect, useState } from 'react';
import { ProductFormViewModel } from '../viewmodels/ProductFormViewModel';
import { CreateProductUseCase, UpdateProductUseCase } from '../../application/usecases/products';
import { ClientProductRepository } from '../../infrastructure/repositories/ClientProductRepository';

// Singleton repositories
const productRepository = new ClientProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);

export const useProductFormViewModel = () => {
  const viewModel = useMemo(
    () => new ProductFormViewModel(
      createProductUseCase,
      updateProductUseCase
    ),
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
