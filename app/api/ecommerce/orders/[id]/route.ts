import { NextRequest, NextResponse } from 'next/server';
import { SymfonyOrderRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyOrderRepository';

const orderRepository = new SymfonyOrderRepository();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await orderRepository.getById(parseInt(params.id));
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Commande non trouvée' },
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
    const order = await orderRepository.update(parseInt(params.id), data);
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la modification de la commande' },
      { status: error.status || 500 }
    );
  }
}
