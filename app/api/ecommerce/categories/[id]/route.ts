import { NextRequest, NextResponse } from 'next/server';
import { SymfonyCategoryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyCategoryRepository';

const categoryRepository = new SymfonyCategoryRepository();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await categoryRepository.getById(parseInt(params.id));
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Catégorie non trouvée' },
      { status: error.status || 404 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const category = await categoryRepository.update(parseInt(params.id), data);
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la modification de la catégorie' },
      { status: error.status || 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await categoryRepository.delete(parseInt(params.id));
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la suppression de la catégorie' },
      { status: error.status || 500 }
    );
  }
}
