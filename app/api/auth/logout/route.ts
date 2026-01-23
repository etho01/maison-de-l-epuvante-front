/**
 * API Route: Logout
 * Supprime le token d'authentification
 */

import { NextResponse } from 'next/server';
import { SymfonyAuthRepository } from '@/src/auth/infrastructure/repositories/SymfonyAuthRepository';
import { LogoutUseCase } from '@/src/auth/application/usecases/LogoutUseCase';
import { TokenStorage } from '@/src/auth/infrastructure/storage/TokenStorage';

const authRepository = new SymfonyAuthRepository();
const logoutUseCase = new LogoutUseCase(authRepository);

export async function POST() {
  try {
    // Appel au Use Case
    await logoutUseCase.execute();
    
    // Supprimer le cookie d'authentification
    await TokenStorage.removeTokenServer();

    return NextResponse.json({ message: 'Déconnexion réussie' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Erreur lors de la déconnexion' },
      { status: 500 }
    );
  }
}
