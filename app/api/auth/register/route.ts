/**
 * API Route: Register
 * Proxy vers l'API Symfony pour l'inscription
 */

import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonyAuthRepository } from '@/src/auth/infrastructure/repositories/SymfonyAuthRepository';
import { RegisterUseCase } from '@/src/auth/application/usecases/RegisterUseCase';
import { TokenStorage } from '@/src/auth/infrastructure/storage/TokenStorage';

const authRepository = new SymfonyAuthRepository();
const registerUseCase = new RegisterUseCase(authRepository);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Appel au Use Case (avec validations)
    const response = await registerUseCase.execute(body);

    // Stocker le token dans un cookie httpOnly
    await TokenStorage.setTokenServer(response.token);

    // Retourner uniquement les données utilisateur
    return NextResponse.json({ user: response.user }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
