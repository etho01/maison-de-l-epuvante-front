import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonyDeliveryRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyDeliveryRepository';
import { UpdateDeliveryStatusUseCase } from '@/src/ecommerce/application/usecases/deliveries';
import { DeliveryStatus } from '@/src/ecommerce/domain/entities/Devivery';

const deliveryRepository = new SymfonyDeliveryRepository();
const updateDeliveryStatusUseCase = new UpdateDeliveryStatusUseCase(deliveryRepository);

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !Object.values(DeliveryStatus).includes(status)) {
      return NextResponse.json(
        { message: 'Statut invalide', errors: [] },
        { status: 400 }
      );
    }

    const delivery = await updateDeliveryStatusUseCase.execute(parseInt(id), status as DeliveryStatus);
    return NextResponse.json(delivery);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
