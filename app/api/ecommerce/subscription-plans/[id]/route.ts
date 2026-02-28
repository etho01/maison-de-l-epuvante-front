import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonySubscriptionPlanRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionPlanRepository';
import { GetSubscriptionPlanByIdUseCase, UpdateSubscriptionPlanUseCase, DeleteSubscriptionPlanUseCase } from '@/src/ecommerce/application/usecases/subscriptions';

const subscriptionPlanRepository = new SymfonySubscriptionPlanRepository();
const getSubscriptionPlanByIdUseCase = new GetSubscriptionPlanByIdUseCase(subscriptionPlanRepository);
const updateSubscriptionPlanUseCase = new UpdateSubscriptionPlanUseCase(subscriptionPlanRepository);
const deleteSubscriptionPlanUseCase = new DeleteSubscriptionPlanUseCase(subscriptionPlanRepository);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const plan = await getSubscriptionPlanByIdUseCase.execute(parseInt(id));
    return NextResponse.json(plan);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const { id } = await params;
    
    const plan = await updateSubscriptionPlanUseCase.execute(parseInt(id), data);
    return NextResponse.json(plan);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await deleteSubscriptionPlanUseCase.execute(parseInt(id));
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
