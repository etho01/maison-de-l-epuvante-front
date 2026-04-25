import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonyAdministratorRepository } from '@/src/auth/infrastructure/repositories/SymfonyAdministratorRepository';
import { GetAdministratorByIdUseCase, UpdateAdministratorUseCase, DeleteAdministratorUseCase } from '@/src/auth/application/usecases/administrators';

const administratorRepository = new SymfonyAdministratorRepository();
const getAdministratorByIdUseCase = new GetAdministratorByIdUseCase(administratorRepository);
const updateAdministratorUseCase = new UpdateAdministratorUseCase(administratorRepository);
const deleteAdministratorUseCase = new DeleteAdministratorUseCase(administratorRepository);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const administrator = await getAdministratorByIdUseCase.execute(parseInt(id));
    return NextResponse.json(administrator);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json();
    const { id } = await params;
    
    const administrator = await updateAdministratorUseCase.execute(parseInt(id), data);
    return NextResponse.json(administrator);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteAdministratorUseCase.execute(parseInt(id));
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
