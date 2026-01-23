/**
 * API Route: Get Current User
 * Récupère les informations de l'utilisateur connecté
 */

import { NextResponse } from 'next/server';
import { SymfonyAuthRepository } from '@/src/auth/infrastructure/repositories/SymfonyAuthRepository';
import { GetCurrentUserUseCase } from '@/src/auth/application/usecases/GetCurrentUserUseCase';

const authRepository = new SymfonyAuthRepository();
const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);

export async function GET() {
  try {
    // Appel au Use Case
    const user = await getCurrentUserUseCase.execute();

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la récupération de l\'utilisateur' },
      { status: error.status || 500 }
    );
  }
}
