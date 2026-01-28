/**
 * Page: Account
 * Page du compte utilisateur avec possibilité de modifier les informations
 */

import { redirect } from 'next/navigation';
import { SymfonyAuthRepository } from '@/src/auth/infrastructure/repositories/SymfonyAuthRepository';
import AccountClient from './AccountClient';

export default async function AccountPage() {
  const authRepository = new SymfonyAuthRepository();
  
  try {
    const user = await authRepository.getCurrentUser();
    
    if (!user) {
      redirect('/auth/login');
    }

    return <AccountClient initialUser={user} />;
  } catch (error) {
    redirect('/auth/login');
  }
}
