import React from 'react';
import AdminAdministratorsClient from './AdminAdministratorsClient';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';
import { GetAllAdministratorsUseCase } from '@/src/auth/application/usecases/administrators';
import { SymfonyAdministratorRepository } from '@/src/auth/infrastructure/repositories/SymfonyAdministratorRepository';

const administratorRepository = new SymfonyAdministratorRepository();
const getAllAdministratorsUseCase = new GetAllAdministratorsUseCase(administratorRepository);

export default async function AdminAdministratorsPage() {
  const administrators = await getAllAdministratorsUseCase.execute();

  return (
    <AdminLayout>
      <AdminAdministratorsClient 
        initialAdministrators={administrators}
      />
    </AdminLayout>
  );
}
