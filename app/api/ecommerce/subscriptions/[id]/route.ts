import { NextRequest, NextResponse } from 'next/server';
import { SymfonySubscriptionRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionRepository';
import { GetSubscriptionByIdUseCase } from '@/src/ecommerce/application/usecases/subscriptions';

const subscriptionRepository = new SymfonySubscriptionRepository();
const getSubscriptionByIdUseCase = new GetSubscriptionByIdUseCase(subscriptionRepository);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subscription = await getSubscriptionByIdUseCase.execute(parseInt(params.id));
    return NextResponse.json(subscription);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Abonnement non trouvé' },
      { status: error.status || 404 }
    );
  }
}
