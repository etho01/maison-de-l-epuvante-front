import { NextRequest, NextResponse } from 'next/server';
import { SymfonyDigitalContentRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyDigitalContentRepository';

const digitalContentRepository = new SymfonyDigitalContentRepository();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.has('page') ? parseInt(searchParams.get('page')!) : undefined;

    const contents = await digitalContentRepository.getAll(page);
    return NextResponse.json(contents);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la récupération des contenus' },
      { status: error.status || 500 }
    );
  }
}
