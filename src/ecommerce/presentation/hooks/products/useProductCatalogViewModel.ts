'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProductCatalogViewModel } from '../../viewmodels/products/ProductCatalogViewModel';
import { ClientProductRepository } from '../../../infrastructure/repositories/ClientProductRepository';
import { ClientCategoryRepository } from '../../../infrastructure/repositories/ClientCategoryRepository';
import { GetProductsUseCase } from '../../../application/usecases/products';
import { GetCategoriesUseCase } from '../../../application/usecases/categories';

// Singletons
const productRepository = new ClientProductRepository();
const categoryRepository = new ClientCategoryRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);

export const useProductCatalogViewModel = () => {
  const viewModel = useMemo(
    () => new ProductCatalogViewModel(getProductsUseCase, getCategoriesUseCase),
    []
  );

  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = viewModel.subscribe(() => {
      forceUpdate({});
    });

    viewModel.init();

    return unsubscribe;
  }, [viewModel]);

  return viewModel;
};
