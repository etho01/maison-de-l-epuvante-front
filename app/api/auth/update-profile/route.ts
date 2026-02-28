/**
 * API Route: Update Profile
 * Proxy vers l'API Symfony pour mettre à jour le profil utilisateur
 */

import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
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
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
