import { NextRequest, NextResponse } from 'next/server';
import { SymfonyOrderRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyOrderRepository';
import { CheckoutUseCase } from '@/src/ecommerce/application/usecases/orders';
import { ApiError } from '@/src/shared/domain/ApiError';

const orderRepository = new SymfonyOrderRepository();
const checkoutUseCase = new CheckoutUseCase(orderRepository);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const order = await checkoutUseCase.execute(data);
    return NextResponse.json(order, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    throw error;
  }
}
