import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonyDeliveryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyDeliveryRepository';
import { GetDeliveriesUseCase } from '@/src/ecommerce/application/usecases/deliveries';

const deliveryRepository = new SymfonyDeliveryRepository();
const getDeliveriesUseCase = new GetDeliveriesUseCase(deliveryRepository);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.has('page') ? parseInt(searchParams.get('page')!) : undefined;

    const deliveries = await getDeliveriesUseCase.execute(page);
    return NextResponse.json(deliveries);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
