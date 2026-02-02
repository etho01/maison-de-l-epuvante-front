import { NextRequest, NextResponse } from 'next/server';
import { SymfonyOrderRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyOrderRepository';
import { CheckoutUseCase } from '@/src/ecommerce/application/usecases/orders';

const orderRepository = new SymfonyOrderRepository();
const checkoutUseCase = new CheckoutUseCase(orderRepository);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const order = await checkoutUseCase.execute(data);
    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la création de la commande' },
      { status: error.status || 500 }
    );
  }
}
