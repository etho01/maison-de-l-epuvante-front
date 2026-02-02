import { NextRequest, NextResponse } from 'next/server';
import { SymfonyDigitalContentRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyDigitalContentRepository';
import { GetDigitalContentByIdUseCase } from '@/src/ecommerce/application/usecases/digital-content';

const digitalContentRepository = new SymfonyDigitalContentRepository();
const getDigitalContentByIdUseCase = new GetDigitalContentByIdUseCase(digitalContentRepository);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const content = await getDigitalContentByIdUseCase.execute(parseInt(params.id));
    return NextResponse.json(content);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Contenu non trouvé' },
      { status: error.status || 404 }
    );
  }
}
