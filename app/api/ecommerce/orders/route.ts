import { NextRequest, NextResponse } from 'next/server';
import { SymfonyOrderRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyOrderRepository';
import { GetOrdersUseCase } from '@/src/ecommerce/application/usecases/orders';

const orderRepository = new SymfonyOrderRepository();
const getOrdersUseCase = new GetOrdersUseCase(orderRepository);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.has('page') ? parseInt(searchParams.get('page')!) : undefined;

    const orders = await getOrdersUseCase.execute(page);
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la récupération des commandes' },
      { status: error.status || 500 }
    );
  }
}
