import { NextRequest, NextResponse } from 'next/server';
import { SymfonySubscriptionRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionRepository';
import { RenewSubscriptionUseCase } from '@/src/ecommerce/application/usecases/subscriptions';

const subscriptionRepository = new SymfonySubscriptionRepository();
const renewSubscriptionUseCase = new RenewSubscriptionUseCase(subscriptionRepository);

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const subscription = await renewSubscriptionUseCase.execute(parseInt(params.id), data);
    return NextResponse.json(subscription);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors du renouvellement' },
      { status: error.status || 500 }
    );
  }
}
