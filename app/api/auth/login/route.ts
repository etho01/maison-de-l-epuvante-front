/**
 * API Route: Login
 * Proxy vers l'API Symfony pour la connexion
 */

import { NextRequest, NextResponse } from 'next/server';
import { SymfonyAuthRepository } from '@/src/auth/infrastructure/repositories/SymfonyAuthRepository';
import { LoginUseCase } from '@/src/auth/application/usecases/LoginUseCase';
import { TokenStorage } from '@/src/auth/infrastructure/storage/TokenStorage';

const authRepository = new SymfonyAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Appel au Use Case (avec validations)
    const response = await loginUseCase.execute(body);

    // Stocker le token dans un cookie httpOnly
    await TokenStorage.setTokenServer(response.token);

    // Retourner uniquement les données utilisateur (pas le token)
    return NextResponse.json({ user: response.user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la connexion' },
      { status: error.status || 500 }
    );
  }
}
