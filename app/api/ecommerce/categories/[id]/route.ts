import { NextRequest, NextResponse } from 'next/server';
import { SymfonyCategoryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyCategoryRepository';
import { GetCategoryByIdUseCase, UpdateCategoryUseCase, DeleteCategoryUseCase } from '@/src/ecommerce/application/usecases/categories';

const categoryRepository = new SymfonyCategoryRepository();
const getCategoryByIdUseCase = new GetCategoryByIdUseCase(categoryRepository);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const category = await getCategoryByIdUseCase.execute(parseInt(id));
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
    const { id } = await params
    const category = await updateCategoryUseCase.execute(parseInt(id), data);
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
    const { id } = await params
    await deleteCategoryUseCase.execute(parseInt(id));
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la suppression de la catégorie' },
      { status: error.status || 500 }
    );
  }
}
