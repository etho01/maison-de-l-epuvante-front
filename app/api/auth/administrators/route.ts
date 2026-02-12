import { NextRequest, NextResponse } from 'next/server';
import { SymfonyAdministratorRepository } from '@/src/auth/infrastructure/repositories/SymfonyAdministratorRepository';
import { GetAllAdministratorsUseCase, CreateAdministratorUseCase } from '@/src/auth/application/usecases/administrators';

const administratorRepository = new SymfonyAdministratorRepository();
const getAllAdministratorsUseCase = new GetAllAdministratorsUseCase(administratorRepository);
const createAdministratorUseCase = new CreateAdministratorUseCase(administratorRepository);

export async function GET(request: NextRequest) {
  try {
    const administrators = await getAllAdministratorsUseCase.execute();
    return NextResponse.json(administrators);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la récupération des administrateurs' },
      { status: error.status || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const administrator = await createAdministratorUseCase.execute(data);
    return NextResponse.json(administrator, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la création de l\'administrateur' },
      { status: error.status || 500 }
    );
  }
}
