import { NextRequest, NextResponse } from 'next/server';
import { SymfonySubscriptionRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionRepository';
import { GetSubscriptionsUseCase } from '@/src/ecommerce/application/usecases/subscriptions';

const subscriptionRepository = new SymfonySubscriptionRepository();
const getSubscriptionsUseCase = new GetSubscriptionsUseCase(subscriptionRepository);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.has('page') ? parseInt(searchParams.get('page')!) : undefined;

    const subscriptions = await getSubscriptionsUseCase.execute(page);
    return NextResponse.json(subscriptions);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la récupération des abonnements' },
      { status: error.status || 500 }
    );
  }
}
