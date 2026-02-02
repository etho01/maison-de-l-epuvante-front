import { NextRequest, NextResponse } from 'next/server';
import { SymfonySubscriptionRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionRepository';
import { CancelSubscriptionUseCase } from '@/src/ecommerce/application/usecases/subscriptions';

const subscriptionRepository = new SymfonySubscriptionRepository();
const cancelSubscriptionUseCase = new CancelSubscriptionUseCase(subscriptionRepository);

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subscription = await cancelSubscriptionUseCase.execute(parseInt(params.id));
    return NextResponse.json(subscription);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de l\'annulation' },
      { status: error.status || 500 }
    );
  }
}
