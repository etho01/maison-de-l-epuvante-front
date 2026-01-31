import { NextRequest, NextResponse } from 'next/server';
import { SymfonySubscriptionRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonySubscriptionRepository';

const subscriptionRepository = new SymfonySubscriptionRepository();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const subscription = await subscriptionRepository.renew(parseInt(params.id), data);
    return NextResponse.json(subscription);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erreur lors du renouvellement' },
      { status: error.status || 500 }
    );
  }
}
