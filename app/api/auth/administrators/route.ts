import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonyAdministratorRepository } from '@/src/auth/infrastructure/repositories/SymfonyAdministratorRepository';
import { GetAllAdministratorsUseCase, CreateAdministratorUseCase } from '@/src/auth/application/usecases/administrators';

const administratorRepository = new SymfonyAdministratorRepository();
const getAllAdministratorsUseCase = new GetAllAdministratorsUseCase(administratorRepository);
const createAdministratorUseCase = new CreateAdministratorUseCase(administratorRepository);

export async function GET(request: NextRequest) {
  try {
    const administrators = await getAllAdministratorsUseCase.execute();
    return NextResponse.json(administrators);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const administrator = await createAdministratorUseCase.execute(data);
    return NextResponse.json(administrator, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
