import { NextRequest, NextResponse } from 'next/server';
import { SymfonyDigitalContentRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyDigitalContentRepository';

const digitalContentRepository = new SymfonyDigitalContentRepository();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const content = await digitalContentRepository.getById(parseInt(params.id));
    return NextResponse.json(content);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Contenu non trouvé' },
      { status: error.status || 404 }
    );
  }
}
