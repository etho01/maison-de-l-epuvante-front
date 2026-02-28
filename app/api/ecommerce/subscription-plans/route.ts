import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/src/shared/domain/ApiError';
import { SymfonySubscriptionPlanRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionPlanRepository';
import { GetSubscriptionPlansUseCase, CreateSubscriptionPlanUseCase } from '@/src/ecommerce/application/usecases/subscriptions';

const subscriptionPlanRepository = new SymfonySubscriptionPlanRepository();
const getSubscriptionPlansUseCase = new GetSubscriptionPlansUseCase(subscriptionPlanRepository);
const createSubscriptionPlanUseCase = new CreateSubscriptionPlanUseCase(subscriptionPlanRepository);

export async function GET(request: NextRequest) {
  try {
    const plans = await getSubscriptionPlansUseCase.execute();
    return NextResponse.json(plans);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const plan = await createSubscriptionPlanUseCase.execute(data);
    return NextResponse.json(plan, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue', errors: [] }, { status: 500 });
  }
}
