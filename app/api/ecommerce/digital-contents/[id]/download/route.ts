import { NextRequest, NextResponse } from 'next/server';
import { SymfonyDigitalContentRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyDigitalContentRepository';

const digitalContentRepository = new SymfonyDigitalContentRepository();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blob = await digitalContentRepository.download(parseInt(params.id));
    
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
