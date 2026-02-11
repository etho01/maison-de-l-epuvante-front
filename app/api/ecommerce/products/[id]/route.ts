import { NextRequest, NextResponse } from 'next/server';
import { SymfonyProductRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyProductRepository';
import { GetProductByIdUseCase, UpdateProductUseCase, DeleteProductUseCase } from '@/src/ecommerce/application/usecases/products';

const productRepository = new SymfonyProductRepository();
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const product = await getProductByIdUseCase.execute(parseInt(id));
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Produit non trouvé' },
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
    
    const product = await updateProductUseCase.execute(parseInt(id), data);
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la modification du produit' },
      { status: error.status || 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await deleteProductUseCase.execute(parseInt(id));
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la suppression du produit' },
      { status: error.status || 500 }
    );
  }
}
