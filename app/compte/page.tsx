/**
 * Page: Account
 * Page du compte utilisateur avec possibilité de modifier les informations
 */

import { redirect } from 'next/navigation';
import { getServerAuthRepository } from '@/src/auth/infrastructure/repositories';
import AccountClient from '@/src/auth/presentation/components/organisms/Account/AccountClient';

export default async function AccountPage() {
  const authRepository = getServerAuthRepository();
  
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
