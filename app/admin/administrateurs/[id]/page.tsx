
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetAdministratorByIdUseCase } from '@/src/auth/application/usecases/administrators/GetAdministratorByIdUseCase';
import { SymfonyAdministratorRepository } from '@/src/auth/infrastructure/repositories/SymfonyAdministratorRepository';

import NotFound from '@/src/shared/components/atoms/NotFound';
import { AdminAdministratorForm } from '@/src/auth/presentation/components/organisms/AdminAdministratorForm';

const administratorRepository = new SymfonyAdministratorRepository();
const getAdministratorByIdUseCase = new GetAdministratorByIdUseCase(administratorRepository);

interface PageProps {
    params: { id: string };
}

export default async function AdminAdministratorDetailPage({ params }: PageProps) {
    const { id } = await params;

    if (id === 'new') {
        return (
            <AdminLayout>
                <AdminAdministratorForm />
            </AdminLayout>
        );
    }

    let administrator;
    try {
        administrator = await getAdministratorByIdUseCase.execute(parseInt(id));
    } catch (error) {
        console.error('Erreur lors de la récupération de l’administrateur :', error);
    }

    if (!administrator) {
        return <NotFound message="Administrateur non trouvé" />;
    }

    return (
        <AdminLayout>
            <AdminAdministratorForm
                administrator={administrator}
            />
        </AdminLayout>
    );
}
