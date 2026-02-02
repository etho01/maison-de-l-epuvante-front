import { NextRequest, NextResponse } from 'next/server';
import { SymfonySubscriptionPlanRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionPlanRepository';
import { GetSubscriptionPlansUseCase, CreateSubscriptionPlanUseCase } from '@/src/ecommerce/application/usecases/subscriptions';

const subscriptionPlanRepository = new SymfonySubscriptionPlanRepository();
const getSubscriptionPlansUseCase = new GetSubscriptionPlansUseCase(subscriptionPlanRepository);
const createSubscriptionPlanUseCase = new CreateSubscriptionPlanUseCase(subscriptionPlanRepository);

export async function GET(request: NextRequest) {
  try {
    const plans = await getSubscriptionPlansUseCase.execute();
    return NextResponse.json(plans);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la récupération des plans' },
      { status: error.status || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const plan = await createSubscriptionPlanUseCase.execute(data);
    return NextResponse.json(plan, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la création du plan' },
      { status: error.status || 500 }
    );
  }
}
