import { NextRequest, NextResponse } from 'next/server';
import { SymfonyCategoryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyCategoryRepository';

const categoryRepository = new SymfonyCategoryRepository();

export async function GET(request: NextRequest) {
  try {
    const categories = await categoryRepository.getAll();
    return NextResponse.json({ 'hydra:member': categories });
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
