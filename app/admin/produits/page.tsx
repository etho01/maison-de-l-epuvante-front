import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetProductsUseCase } from '@/src/ecommerce/application/usecases/products/GetProductsUseCase';
import { SymfonyProductRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyProductRepository';
import { AdminProductList } from '@/src/ecommerce/presentation/components';

const productRepository = new SymfonyProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);

export default async function AdminProductsPage() {
  const produits = await getProductsUseCase.execute({ page: 1 });

  return (
    <AdminLayout>
      <AdminProductList
        initialProducts={produits.member}
        initialPagination={produits.pagination}
      />
    </AdminLayout>
  );
}
