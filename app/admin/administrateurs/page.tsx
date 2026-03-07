import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetAllAdministratorsUseCase } from '@/src/auth/application/usecases/administrators';
import { SymfonyAdministratorRepository } from '@/src/auth/infrastructure/repositories/SymfonyAdministratorRepository';
import { AdminAdministratorList } from '@/src/auth/presentation/components/organisms/AdminAdministratorList';

const administratorRepository = new SymfonyAdministratorRepository();
const getAllAdministratorsUseCase = new GetAllAdministratorsUseCase(administratorRepository);

export default async function AdminAdministratorsPage() {
  const administrators = await getAllAdministratorsUseCase.execute();

  return (
    <AdminLayout>
      <AdminAdministratorList
        initialAdministrators={administrators}
      />
    </AdminLayout>
  );
}
