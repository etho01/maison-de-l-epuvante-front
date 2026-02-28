/**
 * API Route: Resend Verification Email
 * Proxy vers l'API Symfony pour renvoyer l'email de vérification
 */

import { NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonyAuthRepository } from '@/src/auth/infrastructure/repositories/SymfonyAuthRepository';
import { ResendVerificationEmailUseCase } from '@/src/auth/application/usecases/ResendVerificationEmailUseCase';

const authRepository = new SymfonyAuthRepository();
const resendVerificationEmailUseCase = new ResendVerificationEmailUseCase(authRepository);

export async function POST() {
  try {
    // Appel au Use Case
    await resendVerificationEmailUseCase.execute();

    return NextResponse.json(
      { message: 'Email de vérification renvoyé' },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
