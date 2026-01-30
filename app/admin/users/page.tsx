/**
 * Page: Admin Users
 * Gestion des utilisateurs
 */

import { redirect } from 'next/navigation';
import { SymfonyAuthRepository } from '@/src/auth/infrastructure/repositories/SymfonyAuthRepository';
import { isAdmin } from '@/src/auth/utils/roleHelpers';
import AdminUsersClient from './AdminUsersClient';

export default async function AdminUsersPage() {
  const authRepository = new SymfonyAuthRepository();
  
  try {
    const user = await authRepository.getCurrentUser();
    
    if (!user) {
      redirect('/auth/login');
    }

    if (!isAdmin(user)) {
      redirect('/');
    }

    return <AdminUsersClient user={user} />;
  } catch (error) {
    redirect('/auth/login');
  }
}
