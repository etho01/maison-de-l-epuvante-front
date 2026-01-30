/**
 * Page: Admin
 * Espace d'administration réservé aux administrateurs
 */

import { redirect } from 'next/navigation';
import { SymfonyAuthRepository } from '@/src/auth/infrastructure/repositories/SymfonyAuthRepository';
import { isAdmin } from '@/src/auth/utils/roleHelpers';
import AdminDashboard from './AdminDashboard';

export default async function AdminPage() {
  const authRepository = new SymfonyAuthRepository();
  
  try {
    const user = await authRepository.getCurrentUser();
    
    if (!user) {
      redirect('/auth/login');
    }

    if (!isAdmin(user)) {
      redirect('/'); // Redirection si pas admin
    }

    return <AdminDashboard user={user} />;
  } catch (error) {
    redirect('/auth/login');
  }
}
