import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonyDeliveryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyDeliveryRepository';
import { GetDeliveryByIdUseCase } from '@/src/ecommerce/application/usecases/deliveries';

const deliveryRepository = new SymfonyDeliveryRepository();
const getDeliveryByIdUseCase = new GetDeliveryByIdUseCase(deliveryRepository);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const delivery = await getDeliveryByIdUseCase.execute(parseInt(id));
    return NextResponse.json(delivery);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
