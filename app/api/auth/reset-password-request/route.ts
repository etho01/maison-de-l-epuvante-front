/**
 * API Route: Request Password Reset
 * Proxy vers l'API Symfony pour demander une réinitialisation de mot de passe
 */

import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonyAuthRepository } from '@/src/auth/infrastructure/repositories/SymfonyAuthRepository';
import { RequestPasswordResetUseCase } from '@/src/auth/application/usecases/RequestPasswordResetUseCase';

const authRepository = new SymfonyAuthRepository();
const requestPasswordResetUseCase = new RequestPasswordResetUseCase(authRepository);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Appel au Use Case (avec validations)
    await requestPasswordResetUseCase.execute(body);

    return NextResponse.json(
      { message: 'Email de réinitialisation envoyé' },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
