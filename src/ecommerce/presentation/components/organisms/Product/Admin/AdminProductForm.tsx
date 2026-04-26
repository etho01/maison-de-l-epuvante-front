'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProductViewModel, useUpdateProductViewModel } from '../../../../hooks/products';
import { useGetAllCategoriesViewModel } from '../../../../hooks/categories';
import { Product, CreateProductData, UpdateProductData, ProductType } from '../../../../../domain/entities/Product';
import { Category } from '../../../../../domain/entities/Category';
import { Input, Select, TextArea, Button, Checkbox, ErrorMessage } from '@/src/shared/components/atoms';
import { FormSection, FormActions } from '@/src/shared/components/molecules';
import { productSchema, ProductFormData } from '../../../../schemas/ecommerceSchemas';
import { ApiError } from '@/src/shared/domain/ApiError';
import { useRouter } from 'next/navigation';

interface AdminProductFormProps {
  product?: Product;
  onSuccess?: () => void;
  onCancel?: () => void;
  allCategories?: Category[]; // Nécessaire pour la sélection de la catégorie
}

export const AdminProductForm: React.FC<AdminProductFormProps> = ({ product, onSuccess, onCancel, allCategories = [] }) => {
  const createViewModel = useCreateProductViewModel();
  const updateViewModel = useUpdateProductViewModel();
  const { loading: createLoading } = createViewModel.getState();
  const { loading: updateLoading } = updateViewModel.getState();
  
  const loading = createLoading || updateLoading;
  const [error, setError] = useState<string | null>(null);
  const [isInfiniteStock, setIsInfiniteStock] = useState<boolean>(
    product?.type === ProductType.DIGITAL && product?.stock === -1
  );
  const router = useRouter();

  const redirectToList = () => {
    router.push('/admin/produits');
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      slug: product?.slug || '',
      price: product?.price ? Number(product.price) : 0,
      stock: product?.stock || 0,
      type: product?.type || ProductType.PHYSICAL,
      sku: product?.sku || '',
      categoryId: product?.category.id || 0,
      active: product?.active ?? true,
      exclusiveOnline: product?.exclusiveOnline ?? false,
      weight: product?.weight ? Number(product.weight) : undefined,
    },
  });

  const productType = watch('type');
  const isDigital = productType === ProductType.DIGITAL;

  // Reset fields when product type changes
  useEffect(() => {
    if (isDigital) {
      // Clear weight for digital products
      setValue('weight', undefined);
    } else {
      // Reset infinite stock for physical products
      setValue('stock', 0);
      setIsInfiniteStock(false);
    }
  }, [isDigital, setValue]);

  // When toggling infinite stock, update the stock value
  const handleInfiniteStockChange = (checked: boolean) => {
    setIsInfiniteStock(checked);
    if (checked) {
      setValue('stock', -1);
    } else {
      setValue('stock', 0);
    }
  };

  const onSubmit = (formData: ProductFormData) => {
    setError(null);
    
    const data: CreateProductData | UpdateProductData = {
      name: formData.name,
      description: formData.description,
      slug: formData.slug,
      price: formData.price,
      stock: formData.stock,
      type: formData.type as ProductType,
      sku: formData.sku,
      categoryId: formData.categoryId,
      active: formData.active,
      exclusiveOnline: formData.exclusiveOnline,
      weight: formData.type === ProductType.DIGITAL ? undefined : (formData.weight || undefined),
    };

    const promise = product
      ? updateViewModel.updateProduct(product.id, data)
      : createViewModel.createProduct(data as CreateProductData);

    promise
      .then(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          redirectToList();
        }
      })
      .catch((err: ApiError) => {
        setError(err.message || 'Erreur lors de l\'enregistrement du produit');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-effect border border-crimson-900/30 text-neutral-100 p-6 rounded-xl shadow-crimson-md space-y-6">
      <h2 className="text-2xl font-bold mb-4 bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">
        {product ? 'Modifier le produit' : 'Nouveau produit'}
      </h2>

      <ErrorMessage message={error} />

      <FormSection 
        title="Informations générales"
        description="Informations de base du produit"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom *"
            type="text"
            error={errors.name?.message}
            variant="default"
            {...register('name')}
          />

          <Input
            label="Slug *"
            type="text"
            error={errors.slug?.message}
            variant="default"
            {...register('slug')}
          />

          <Input
            label="SKU *"
            type="text"
            error={errors.sku?.message}
            variant="default"
            {...register('sku')}
          />

          <Select
            label="Catégorie *"
            error={errors.categoryId?.message}
            variant="default"
            {...register('categoryId', { valueAsNumber: true })}
          >
            <option value="">Sélectionner une catégorie</option>
            {allCategories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </div>

        <TextArea
          label="Description *"
          rows={4}
          error={errors.description?.message}
          variant="default"
          {...register('description')}
        />
      </FormSection>

      <FormSection 
        title="Tarification et inventaire"
        description="Prix, stock et caractéristiques du produit"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prix *"
            type="number"
            step="0.01"
            error={errors.price?.message}
            variant="default"
            {...register('price', { valueAsNumber: true })}
          />

          <Select
            label="Type *"
            error={errors.type?.message}
            variant="default"
            {...register('type')}
          >
            <option value={ProductType.PHYSICAL}>Physique</option>
            <option value={ProductType.DIGITAL}>Numérique</option>
          </Select>

          <>
            {isDigital && (
              <div className="mb-2">
                <Checkbox
                  label="Stock infini"
                  checked={isInfiniteStock}
                  onChange={(e) => handleInfiniteStockChange(e.target.checked)}
                />
              </div>
            )}
            {!(isDigital && isInfiniteStock) && (
              <Input
                label="Stock *"
                type="number"
                error={errors.stock?.message}
                variant="default"
                {...register('stock', { valueAsNumber: true })}
              />
            )}
          </>
          {!isDigital && (
            <Input
              label="Poids (kg)"
              type="number"
              step="0.01"
              error={errors.weight?.message}
              variant="default"
              {...register('weight', { valueAsNumber: true })}
            />
          )}
        </div>
      </FormSection>

      <FormSection title="Options">
        <div className="flex gap-4">
          <Checkbox
            label="Actif"
            {...register('active')}
          />

          <Checkbox
            label="Exclusivité en ligne"
            {...register('exclusiveOnline')}
          />
        </div>
      </FormSection>

      <FormActions align="left">
        <Button
          type="submit"
          disabled={loading || isSubmitting}
          variant="primary"
          isLoading={loading || isSubmitting}
        >
          {product ? 'Mettre à jour' : 'Créer'}
        </Button>
        <Button
          type="button"
          onClick={onCancel || redirectToList}
          variant="secondary"
        >
          Annuler
        </Button>
      </FormActions>
    </form>
  );
};
