import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonyCategoryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyCategoryRepository';
import { GetCategoriesUseCase } from '@/src/ecommerce/application/usecases/categories';

const categoryRepository = new SymfonyCategoryRepository();
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);

export async function GET(request: NextRequest) {
  try {
    const categories = await getCategoriesUseCase.execute();
    return NextResponse.json(categories);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const category = await categoryRepository.create(data);
    return NextResponse.json(category, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
