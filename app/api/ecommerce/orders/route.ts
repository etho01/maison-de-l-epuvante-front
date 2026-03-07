import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonyOrderRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyOrderRepository';
import { GetOrdersUseCase } from '@/src/ecommerce/application/usecases/orders';
import { OrderStatus } from '@/src/ecommerce/domain/entities/Order';
import { OrderFilters } from '@/src/ecommerce/domain/repositories/IOrderRepository';

const orderRepository = new SymfonyOrderRepository();
const getOrdersUseCase = new GetOrdersUseCase(orderRepository);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filters: OrderFilters = {};
    
    if (searchParams.has('page')) {
      filters.page = parseInt(searchParams.get('page')!);
    }
    
    if (searchParams.has('status')) {
      filters.status = searchParams.get('status') as OrderStatus;
    }

    const orders = await getOrdersUseCase.execute(filters);
    return NextResponse.json(orders);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
