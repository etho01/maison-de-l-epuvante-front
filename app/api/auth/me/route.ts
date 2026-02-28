/**
 * API Route: Get Current User
 * Récupère les informations de l'utilisateur connecté
 */

import { NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonyAuthRepository } from '@/src/auth/infrastructure/repositories/SymfonyAuthRepository';
import { GetCurrentUserUseCase } from '@/src/auth/application/usecases/GetCurrentUserUseCase';

const authRepository = new SymfonyAuthRepository();
const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);

export async function GET() {
  try {
    // Appel au Use Case
    const user = await getCurrentUserUseCase.execute();

    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
