import { NextRequest, NextResponse } from 'next/server';
import { SymfonySubscriptionRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionRepository';

const subscriptionRepository = new SymfonySubscriptionRepository();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subscription = await subscriptionRepository.getById(parseInt(params.id));
    return NextResponse.json(subscription);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Abonnement non trouvé' },
      { status: error.status || 404 }
    );
  }
}
