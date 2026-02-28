import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonyDigitalContentRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyDigitalContentRepository';
import { DownloadDigitalContentUseCase } from '@/src/ecommerce/application/usecases/digital-content';

const digitalContentRepository = new SymfonyDigitalContentRepository();
const downloadDigitalContentUseCase = new DownloadDigitalContentUseCase(digitalContentRepository);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blob = await downloadDigitalContentUseCase.execute(parseInt(params.id));
    
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="fanzine-${params.id}.pdf"`,
      },
    });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
