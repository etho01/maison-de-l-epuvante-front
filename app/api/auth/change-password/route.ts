/**
 * API Route: Change Password
 * Proxy vers l'API Symfony pour changer le mot de passe
 */

import { NextRequest, NextResponse } from 'next/server';
import { SymfonyAuthRepository } from '@/src/auth/infrastructure/repositories/SymfonyAuthRepository';
import { ChangePasswordUseCase } from '@/src/auth/application/usecases/ChangePasswordUseCase';

const authRepository = new SymfonyAuthRepository();
const changePasswordUseCase = new ChangePasswordUseCase(authRepository);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Appel au Use Case (avec validations)
    await changePasswordUseCase.execute(body);

    return NextResponse.json(
      { message: 'Mot de passe modifié avec succès' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors du changement de mot de passe' },
      { status: error.status || 500 }
    );
  }
}
