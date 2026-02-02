import { NextRequest, NextResponse } from 'next/server';
import { SymfonySubscriptionRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionRepository';
import { SubscribeUseCase } from '@/src/ecommerce/application/usecases/subscriptions';

const subscriptionRepository = new SymfonySubscriptionRepository();
const subscribeUseCase = new SubscribeUseCase(subscriptionRepository);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const subscription = await subscribeUseCase.execute(data);
    return NextResponse.json(subscription, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la souscription' },
      { status: error.status || 500 }
    );
  }
}
