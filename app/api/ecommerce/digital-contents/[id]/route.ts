import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonyDigitalContentRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyDigitalContentRepository';
import { GetDigitalContentByIdUseCase } from '@/src/ecommerce/application/usecases/digital-content';

const digitalContentRepository = new SymfonyDigitalContentRepository();
const getDigitalContentByIdUseCase = new GetDigitalContentByIdUseCase(digitalContentRepository);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const content = await getDigitalContentByIdUseCase.execute(parseInt(id));
    return NextResponse.json(content);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
