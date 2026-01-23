/**
 * API Route: Verify Email
 * Proxy vers l'API Symfony pour vérifier l'email
 */

import { NextRequest, NextResponse } from 'next/server';
import { SymfonyAuthRepository } from '@/src/auth/infrastructure/repositories/SymfonyAuthRepository';
import { VerifyEmailUseCase } from '@/src/auth/application/usecases/VerifyEmailUseCase';

const authRepository = new SymfonyAuthRepository();
const verifyEmailUseCase = new VerifyEmailUseCase(authRepository);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { message: 'Token manquant' },
        { status: 400 }
      );
    }
    
    // Appel au Use Case (avec validations)
    await verifyEmailUseCase.execute({ token });

    return NextResponse.json(
      { message: 'Email vérifié avec succès' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la vérification de l\'email' },
      { status: error.status || 500 }
    );
  }
}
