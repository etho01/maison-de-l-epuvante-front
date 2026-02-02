import { NextRequest, NextResponse } from 'next/server';
import { SymfonyDigitalContentRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyDigitalContentRepository';
import { GetDigitalContentsUseCase } from '@/src/ecommerce/application/usecases/digital-content';

const digitalContentRepository = new SymfonyDigitalContentRepository();
const getDigitalContentsUseCase = new GetDigitalContentsUseCase(digitalContentRepository);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.has('page') ? parseInt(searchParams.get('page')!) : undefined;

    const contents = await getDigitalContentsUseCase.execute(page);
    return NextResponse.json(contents);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la récupération des contenus' },
      { status: error.status || 500 }
    );
  }
}
