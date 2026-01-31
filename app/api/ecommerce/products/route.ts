import { NextRequest, NextResponse } from 'next/server';
import { SymfonyProductRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyProductRepository';
import { ProductFilters } from '@/src/ecommerce/domain/entities/Product';

const productRepository = new SymfonyProductRepository();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const filters: ProductFilters = {};
    
    if (searchParams.has('name')) filters.name = searchParams.get('name')!;
    if (searchParams.has('type')) filters.type = searchParams.get('type') as any;
    if (searchParams.has('category.id')) filters['category.id'] = parseInt(searchParams.get('category.id')!);
    if (searchParams.has('price[gte]')) filters['price[gte]'] = parseFloat(searchParams.get('price[gte]')!);
    if (searchParams.has('price[lte]')) filters['price[lte]'] = parseFloat(searchParams.get('price[lte]')!);
    if (searchParams.has('active')) filters.active = searchParams.get('active') === 'true';
    if (searchParams.has('exclusiveOnline')) filters.exclusiveOnline = searchParams.get('exclusiveOnline') === 'true';
    if (searchParams.has('page')) filters.page = parseInt(searchParams.get('page')!);

    const products = await productRepository.getAll(filters);
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la récupération des produits' },
      { status: error.status || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const product = await productRepository.create(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la création du produit' },
      { status: error.status || 500 }
    );
  }
}
