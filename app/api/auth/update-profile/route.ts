/**
 * API Route: Update Profile
 * Proxy vers l'API Symfony pour mettre à jour le profil utilisateur
 */

import { NextRequest, NextResponse } from 'next/server';
import { SymfonyAuthRepository } from '@/src/auth/infrastructure/repositories/SymfonyAuthRepository';
import { UpdateUserUseCase } from '@/src/auth/application/usecases/UpdateUserUseCase';

const authRepository = new SymfonyAuthRepository();
const updateUserUseCase = new UpdateUserUseCase(authRepository);

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Appel au Use Case (avec validations)
    const updatedUser = await updateUserUseCase.execute(body);

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la mise à jour du profil' },
      { status: error.status || 500 }
    );
  }
}
