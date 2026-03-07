import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonyOrderRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyOrderRepository';
import { GetOrderByPaymentIntentIdUseCase } from '@/src/ecommerce/application/usecases/orders';

const orderRepository = new SymfonyOrderRepository();
const getOrderByPaymentIntentIdUseCase = new GetOrderByPaymentIntentIdUseCase(orderRepository);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ paymentIntentId: string }> }
) {
  try {
    const { paymentIntentId } = await params;
    const order = await getOrderByPaymentIntentIdUseCase.execute(paymentIntentId);
    return NextResponse.json(order);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
