import { GetAllCategoriesUseCase } from '@/src/ecommerce/application/usecases/categories';
import { GetProductsUseCase } from '@/src/ecommerce/application/usecases/products';
import { SymfonyCategoryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyCategoryRepository';
import { SymfonyProductRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyProductRepository';
import { ProductCatalog } from '@/src/ecommerce/presentation/components/ProductCatalog';

const productRepository = new SymfonyProductRepository();
const getProductUseCase = new GetProductsUseCase(productRepository);

const categoryRepository = new SymfonyCategoryRepository();
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);

export default async function ProduitsPage() {
  const resp = await getProductUseCase.execute();
  const pagination = resp.pagination
  const products = resp.member;

  const categories = await getAllCategoriesUseCase.execute();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Produits</h1>
      <ProductCatalog 
        initialProducts={products} 
        initialProductPagination={pagination} 
        categories={categories}
      />
    </div>
  );
}
