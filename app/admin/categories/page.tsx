import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { SymfonyCategoryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyCategoryRepository';
import { GetAllCategoriesUseCase } from '@/src/ecommerce/application/usecases/categories/GetAllCategoriesUseCase';
import { GetCategoriesUseCase } from '@/src/ecommerce/application/usecases';
import { AdminCategoryList } from '@/src/ecommerce/presentation/components';

const categoryRepository = new SymfonyCategoryRepository();
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);

export default async function AdminCategoriesPage() {
  const categories = await getCategoriesUseCase.execute();

  return (
    <AdminLayout>
        <AdminCategoryList 
          initialCategories={categories.member} 
          initialPagination={categories.pagination} 
        />
    </AdminLayout>
  );
}
