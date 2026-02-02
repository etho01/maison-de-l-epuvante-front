import { NextRequest, NextResponse } from 'next/server';
import { SymfonyCategoryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyCategoryRepository';
import { GetCategoriesUseCase } from '@/src/ecommerce/application/usecases/categories';

const categoryRepository = new SymfonyCategoryRepository();
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);

export async function GET(request: NextRequest) {
  try {
    const categories = await getCategoriesUseCase.execute();
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la récupération des catégories' },
      { status: error.status || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const category = await categoryRepository.create(data);
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la création de la catégorie' },
      { status: error.status || 500 }
    );
  }
}
