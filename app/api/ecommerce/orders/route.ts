import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
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
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
