import { NextRequest, NextResponse } from 'next/server';
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
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors du téléchargement' },
      { status: error.status || 500 }
    );
  }
}
