/**
 * API Route: Confirm Password Reset
 * Proxy vers l'API Symfony pour confirmer la réinitialisation du mot de passe
 */

import { NextRequest, NextResponse } from 'next/server';
import { SymfonyAuthRepository } from '@/src/auth/infrastructure/repositories/SymfonyAuthRepository';
import { ConfirmPasswordResetUseCase } from '@/src/auth/application/usecases/ConfirmPasswordResetUseCase';

const authRepository = new SymfonyAuthRepository();
const confirmPasswordResetUseCase = new ConfirmPasswordResetUseCase(authRepository);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Appel au Use Case (avec validations)
    await confirmPasswordResetUseCase.execute(body);

    return NextResponse.json(
      { message: 'Mot de passe réinitialisé avec succès' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la réinitialisation du mot de passe' },
      { status: error.status || 500 }
    );
  }
}